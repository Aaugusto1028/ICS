const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');
const { ACTIVIDADES } = require('../domain/actividades');

/*
 * Repositorio de inscripciones sobre SQLite.
 *
 * Usa sql.js (SQLite compilado a WebAssembly): no necesita instalar ningún
 * motor de base de datos ni compilar módulos nativos, funciona igual en
 * Windows, Linux y Mac. El archivo resultante es un .sqlite estándar que se
 * puede abrir con "DB Browser for SQLite".
 *
 * - Con `archivo`: lee la base de ese archivo (si existe) y la vuelve a escribir
 *   después de cada cambio.
 * - Sin `archivo`: base en memoria (la usan los tests).
 */

const ESQUEMA = `
CREATE TABLE IF NOT EXISTS actividades (
  id               TEXT PRIMARY KEY,
  nombre           TEXT NOT NULL,
  requiere_talla   INTEGER NOT NULL CHECK (requiere_talla IN (0, 1)),
  cupo_por_horario INTEGER NOT NULL CHECK (cupo_por_horario > 0),
  horarios         TEXT NOT NULL           -- lista separada por comas
);

CREATE TABLE IF NOT EXISTS inscripciones (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo             TEXT NOT NULL UNIQUE,
  actividad_id       TEXT NOT NULL REFERENCES actividades(id),
  fecha              TEXT NOT NULL,        -- AAAA-MM-DD
  horario            TEXT NOT NULL,        -- HH:MM
  cantidad_personas  INTEGER NOT NULL CHECK (cantidad_personas BETWEEN 1 AND 10),
  email              TEXT NOT NULL,
  acepta_terminos    INTEGER NOT NULL CHECK (acepta_terminos = 1),
  terminos_aceptados TEXT NOT NULL,        -- copia del texto aceptado, como constancia
  contenido_qr       TEXT NOT NULL,
  email_estado       TEXT NOT NULL DEFAULT 'pendiente'
                     CHECK (email_estado IN ('pendiente', 'enviado', 'guardado_en_archivo', 'error')),
  email_error        TEXT,
  creada_en          TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_inscripciones_turno ON inscripciones (actividad_id, fecha, horario);

CREATE TABLE IF NOT EXISTS participantes (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  inscripcion_id INTEGER NOT NULL REFERENCES inscripciones(id) ON DELETE CASCADE,
  orden          INTEGER NOT NULL,
  nombre         TEXT NOT NULL,
  dni            TEXT NOT NULL,
  edad           INTEGER NOT NULL CHECK (edad BETWEEN 0 AND 120),
  talla          TEXT,
  UNIQUE (inscripcion_id, dni)
);
`;

let moduloSQL = null;
async function cargarSQL() {
  if (!moduloSQL) moduloSQL = await initSqlJs();
  return moduloSQL;
}

class RepositorioSQLite {
  /** Crea el repositorio. Es async porque carga el motor SQLite (WebAssembly). */
  static async crear({ archivo = null } = {}) {
    const SQL = await cargarSQL();
    const db = archivo && fs.existsSync(archivo) ? new SQL.Database(fs.readFileSync(archivo)) : new SQL.Database();
    const repo = new RepositorioSQLite(db, archivo);
    repo.#migrar();
    return repo;
  }

  #db;
  #archivo;

  constructor(db, archivo) {
    this.#db = db;
    this.#archivo = archivo;
  }

  // ------------------------------------------------------------------ escritura

  guardar(inscripcion) {
    this.#transaccion(() => {
      this.#ejecutar(
        `INSERT INTO inscripciones
           (codigo, actividad_id, fecha, horario, cantidad_personas, email,
            acepta_terminos, terminos_aceptados, contenido_qr, creada_en)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          inscripcion.codigo,
          inscripcion.actividadId,
          inscripcion.fecha,
          inscripcion.horario,
          inscripcion.cantidadPersonas,
          inscripcion.email,
          inscripcion.aceptaTerminos ? 1 : 0,
          inscripcion.terminosAceptados,
          inscripcion.contenidoQR,
          inscripcion.creadaEn,
        ]
      );
      const id = this.#valor('SELECT last_insert_rowid()');
      inscripcion.participantes.forEach((p, i) => {
        this.#ejecutar(
          'INSERT INTO participantes (inscripcion_id, orden, nombre, dni, edad, talla) VALUES (?, ?, ?, ?, ?, ?)',
          [id, i + 1, p.nombre, p.dni, p.edad, p.talla ?? null]
        );
      });
    });
    return inscripcion;
  }

  actualizarEstadoEmail(codigo, estado, error = null) {
    this.#ejecutar('UPDATE inscripciones SET email_estado = ?, email_error = ? WHERE codigo = ?', [estado, error, codigo]);
    this.#persistir();
  }

  // ------------------------------------------------------------------ lectura

  cuposOcupados(actividadId, fecha, horario) {
    return this.#valor(
      `SELECT COALESCE(SUM(cantidad_personas), 0) FROM inscripciones
        WHERE actividad_id = ? AND fecha = ? AND horario = ?`,
      [actividadId, fecha, horario]
    );
  }

  buscarPorCodigo(codigo) {
    const [fila] = this.#filas('SELECT * FROM inscripciones WHERE codigo = ?', [codigo]);
    return fila ? this.#aInscripcion(fila) : null;
  }

  listar() {
    return this.#filas('SELECT * FROM inscripciones ORDER BY id').map((f) => this.#aInscripcion(f));
  }

  listarActividades() {
    return this.#filas('SELECT * FROM actividades ORDER BY id');
  }

  contarParticipantes() {
    return this.#valor('SELECT COUNT(*) FROM participantes');
  }

  cerrar() {
    this.#db.close();
  }

  // ------------------------------------------------------------------ privados

  #migrar() {
    this.#db.run('PRAGMA foreign_keys = ON;');
    this.#db.exec(ESQUEMA);
    // Sincroniza el catálogo (si cambia un cupo u horario en el código, se actualiza la tabla)
    this.#transaccion(() => {
      for (const a of ACTIVIDADES) {
        this.#ejecutar(
          `INSERT INTO actividades (id, nombre, requiere_talla, cupo_por_horario, horarios) VALUES (?, ?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET nombre = excluded.nombre, requiere_talla = excluded.requiere_talla,
             cupo_por_horario = excluded.cupo_por_horario, horarios = excluded.horarios`,
          [a.id, a.nombre, a.requiereTalla ? 1 : 0, a.cupoPorHorario, a.horarios.join(',')]
        );
      }
    });
  }

  /** Ejecuta `fn` dentro de una transacción: o se guarda todo, o nada. Después escribe el archivo. */
  #transaccion(fn) {
    this.#db.run('BEGIN');
    try {
      fn();
      this.#db.run('COMMIT');
    } catch (e) {
      this.#db.run('ROLLBACK');
      throw e;
    }
    this.#persistir();
  }

  #ejecutar(sql, params = []) {
    this.#db.run(sql, params);
  }

  #filas(sql, params = []) {
    const stmt = this.#db.prepare(sql);
    try {
      stmt.bind(params);
      const filas = [];
      while (stmt.step()) filas.push(stmt.getAsObject());
      return filas;
    } finally {
      stmt.free();
    }
  }

  #valor(sql, params = []) {
    const [fila] = this.#filas(sql, params);
    return fila ? Object.values(fila)[0] : null;
  }

  #aInscripcion(f) {
    const participantes = this.#filas(
      'SELECT nombre, dni, edad, talla FROM participantes WHERE inscripcion_id = ? ORDER BY orden',
      [f.id]
    );
    return {
      codigo: f.codigo,
      actividadId: f.actividad_id,
      fecha: f.fecha,
      horario: f.horario,
      cantidadPersonas: f.cantidad_personas,
      participantes,
      email: f.email,
      aceptaTerminos: f.acepta_terminos === 1,
      terminosAceptados: f.terminos_aceptados,
      contenidoQR: f.contenido_qr,
      emailEstado: f.email_estado,
      emailError: f.email_error,
      creadaEn: f.creada_en,
    };
  }

  /** Escribe la base al archivo (primero a un temporal y después renombra, para no dejarlo corrupto). */
  #persistir() {
    if (!this.#archivo) return;
    fs.mkdirSync(path.dirname(this.#archivo), { recursive: true });
    const temporal = `${this.#archivo}.tmp`;
    fs.writeFileSync(temporal, Buffer.from(this.#db.export()));
    fs.renameSync(temporal, this.#archivo);
    // export() reinicia los PRAGMA: hay que volver a activar las claves foráneas
    this.#db.run('PRAGMA foreign_keys = ON;');
  }
}

module.exports = { RepositorioSQLite };
