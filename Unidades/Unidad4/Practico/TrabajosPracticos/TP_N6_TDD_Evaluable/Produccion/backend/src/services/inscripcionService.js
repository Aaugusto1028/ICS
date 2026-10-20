const crypto = require('crypto');
const {
  ACTIVIDADES,
  TALLAS_VALIDAS,
  TERMINOS_GENERALES,
  VERSION_TERMINOS,
  buscarActividad,
  textoTerminos,
} = require('../domain/actividades');
const {
  HORAS_ANTICIPACION_MAXIMA,
  MINUTOS_CIERRE_INSCRIPCION,
  parsearFecha,
  esHoraValida,
  parqueAbiertoEnFecha,
  parqueAbiertoEnHora,
  estadoVentanaInscripcion,
  fechasInscribibles,
} = require('../domain/parque');
const { ErrorValidacion, ErrorNoEncontrado, ErrorNoDisponible, ErrorSinCupo } = require('../errors');

// No hay máximo de personas por inscripción (FAQ 31): el único límite es el cupo libre del turno.
const REGEX_DNI = /^\d{6,8}$/; // DNI de 6 a 8 dígitos (los más viejos tienen 6)
const EDAD_MAXIMA = 100;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function codigoAleatorio() {
  return 'INS-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

/** '2026-10-10' -> 'Sábado 10/10/2026' */
function fechaLegible(fecha) {
  const d = parsearFecha(fecha);
  const [a, m, dia] = fecha.split('-');
  return `${DIAS[d.getDay()]} ${dia}/${m}/${a}`;
}

/** Quita tildes y ñ ('Jardinería' -> 'Jardineria'): algunos lectores de QR muestran mal los acentos. */
function sinTildes(texto) {
  return String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Texto que se codifica en el QR. Es texto plano para que cualquier lector de QR
 * del celular muestre el detalle sin necesitar internet ni una app propia.
 * Va lo justo para el control en el ingreso (código, turno y nombre + DNI de cada persona):
 * cuanto más corto el texto, menos cuadraditos tiene el QR y más fácil lo lee la cámara.
 * El detalle completo (edad, talla, email) está en el mail y en la página de la inscripción.
 */
function armarContenidoQR(inscripcion, actividad, urlDetalle) {
  const lineas = [
    `ECOHARMONY PARK ${inscripcion.codigo}`,
    `${actividad.nombre} ${fechaLegible(inscripcion.fecha)} ${inscripcion.horario} hs`,
    ...inscripcion.participantes.map((p, i) => `${i + 1}. ${p.nombre} DNI ${p.dni}`),
  ];
  if (urlDetalle) lineas.push(urlDetalle);
  return sinTildes(lineas.join('\n'));
}

class InscripcionService {
  /**
   * @param {object} deps
   * @param {RepositorioEnMemoria} deps.repositorio
   * @param {{enviarConfirmacion: Function}} deps.mailer
   * @param {() => Date} [deps.reloj]          inyectable para testear fechas
   * @param {() => string} [deps.generarCodigo] inyectable para testear códigos
   * @param {string} [deps.urlPublica]         URL del front (ej. http://192.168.0.10:5173) para el link del QR
   */
  constructor({ repositorio, mailer, reloj = () => new Date(), generarCodigo = codigoAleatorio, urlPublica = null }) {
    this.repositorio = repositorio;
    this.mailer = mailer;
    this.reloj = reloj;
    this.generarCodigo = generarCodigo;
    this.urlPublica = urlPublica ? urlPublica.replace(/\/+$/, '') : null;
  }

  listarActividades() {
    return ACTIVIDADES.map(({ id, nombre, descripcion, requiereTalla, motivoTalla, cupoPorHorario, edadMinima, horarios, terminos }) => ({
      id,
      nombre,
      descripcion,
      requiereTalla,
      motivoTalla: motivoTalla || null,
      cupoPorHorario,
      edadMinima,
      horarios,
      terminos,
      tallas: requiereTalla ? TALLAS_VALIDAS : [],
    }));
  }

  /** Detalle de una actividad con sus términos y condiciones (para la página de términos). */
  obtenerActividad(actividadId) {
    const actividad = this.listarActividades().find((a) => a.id === actividadId);
    if (!actividad) throw new ErrorNoEncontrado('La actividad seleccionada no existe.');
    return { ...actividad, terminosGenerales: TERMINOS_GENERALES, versionTerminos: VERSION_TERMINOS };
  }

  /** Inscripción guardada en la base, con el nombre de la actividad. */
  obtenerInscripcion(codigo) {
    const inscripcion = this.repositorio.buscarPorCodigo(codigo);
    if (!inscripcion) throw new ErrorNoEncontrado('No existe una inscripción con ese código.');
    return this.#respuesta(inscripcion, buscarActividad(inscripcion.actividadId));
  }

  /**
   * Inscripciones guardadas, de la más nueva a la más vieja.
   * Se puede filtrar por actividad y/o fecha (para la pestaña "Inscripciones").
   */
  listarInscripciones({ actividadId, fecha } = {}) {
    if (actividadId) this.#obtenerActividad(actividadId);
    return this.repositorio
      .listar()
      .filter((i) => (!actividadId || i.actividadId === actividadId) && (!fecha || i.fecha === fecha))
      .reverse()
      .map((i) => this.#respuesta(i, buscarActividad(i.actividadId)));
  }

  /**
   * Días que se pueden elegir en el formulario: hoy y mañana (la inscripción abre
   * 24 hs antes de cada turno). Los días en que el parque cierra vienen marcados
   * para que el front los muestre deshabilitados (FAQ 2).
   */
  fechasDisponibles() {
    return fechasInscribibles(this.reloj());
  }

  disponibilidad(actividadId, fecha) {
    const actividad = this.#obtenerActividad(actividadId);
    if (!parsearFecha(fecha)) {
      throw new ErrorValidacion([{ campo: 'fecha', mensaje: 'La fecha debe tener formato AAAA-MM-DD.' }]);
    }
    const parqueAbierto = parqueAbiertoEnFecha(fecha);
    const ahora = this.reloj();
    const horarios = actividad.horarios.map((horario) => {
      const cuposRestantes = Math.max(
        0,
        actividad.cupoPorHorario - this.repositorio.cuposOcupados(actividad.id, fecha, horario)
      );
      // inscripcion: 'abierta' | 'cerrada' (faltan 15 min o menos) | 'no_habilitada' (faltan más de 24 hs)
      const inscripcion = estadoVentanaInscripcion(fecha, horario, ahora);
      const disponible = parqueAbierto && inscripcion === 'abierta' && cuposRestantes > 0;
      return { horario, cupoTotal: actividad.cupoPorHorario, cuposRestantes, inscripcion, disponible };
    });
    return { actividadId: actividad.id, fecha, parqueAbierto, horarios };
  }

  async inscribir(solicitud = {}) {
    const actividad = this.#obtenerActividad(solicitud.actividadId);

    // 1) Datos del formulario
    const errores = this.#validarDatos(solicitud, actividad);
    if (errores.length) throw new ErrorValidacion(errores);

    // 2) Que el parque y la actividad estén disponibles en ese momento
    this.#validarDisponibilidad(actividad, solicitud.fecha, solicitud.horario);

    // 3) Que nadie del grupo esté inscripto en otro turno del mismo horario (FAQ 29)
    this.#validarSinSuperposicion(solicitud);

    // 4) Cupo. Se verifica y se guarda sin "await" en medio: en Node eso es atómico
    //    y evita que dos pedidos simultáneos se lleven el mismo último lugar.
    const ocupados = this.repositorio.cuposOcupados(actividad.id, solicitud.fecha, solicitud.horario);
    const restantes = actividad.cupoPorHorario - ocupados;
    if (solicitud.cantidadPersonas > restantes) {
      throw new ErrorSinCupo(
        restantes <= 0
          ? `No quedan cupos para ${actividad.nombre} el ${solicitud.fecha} a las ${solicitud.horario}.`
          : `Solo quedan ${restantes} cupo(s) para ${actividad.nombre} en ese horario.`,
        Math.max(0, restantes)
      );
    }

    const codigo = this.generarCodigo();
    const inscripcion = {
      codigo,
      actividadId: actividad.id,
      fecha: solicitud.fecha,
      horario: solicitud.horario,
      cantidadPersonas: solicitud.cantidadPersonas,
      participantes: solicitud.participantes.map((p) => ({
        nombre: p.nombre.trim(),
        dni: String(p.dni).trim(),
        edad: Number(p.edad),
        talla: actividad.requiereTalla ? p.talla : null,
      })),
      email: solicitud.email.trim().toLowerCase(),
      aceptaTerminos: true,
      terminosAceptados: textoTerminos(actividad),
      creadaEn: this.reloj().toISOString(),
      emailEstado: 'pendiente',
      emailError: null,
    };
    inscripcion.contenidoQR = armarContenidoQR(inscripcion, actividad, this.#urlDetalle(codigo));
    this.repositorio.guardar(inscripcion);

    // 5) Email de confirmación con QR. Si falla, la reserva NO se pierde: queda registrado el motivo.
    try {
      const { modo } = (await this.mailer.enviarConfirmacion({ inscripcion, actividad, urlDetalle: this.#urlDetalle(codigo) })) || {};
      inscripcion.emailEstado = modo === 'archivo' ? 'guardado_en_archivo' : 'enviado';
    } catch (e) {
      inscripcion.emailEstado = 'error';
      inscripcion.emailError = e.message;
      console.error(`[mail] No se pudo enviar la confirmación ${codigo}:`, e.message);
    }
    this.repositorio.actualizarEstadoEmail(codigo, inscripcion.emailEstado, inscripcion.emailError);

    return this.#respuesta(inscripcion, actividad);
  }

  // ---------------------------------------------------------------- privados

  #urlDetalle(codigo) {
    return this.urlPublica ? `${this.urlPublica}/inscripcion/${codigo}` : null;
  }

  /** Lo que se devuelve al front (sin el texto completo de los términos). */
  #respuesta(inscripcion, actividad) {
    const { terminosAceptados, ...resto } = inscripcion;
    return {
      ...resto,
      // Se rearma siempre, así las inscripciones viejas también usan el QR corto
      contenidoQR: armarContenidoQR(inscripcion, actividad, this.#urlDetalle(inscripcion.codigo)),
      actividad: { id: actividad.id, nombre: actividad.nombre, requiereTalla: actividad.requiereTalla },
      emailEnviado: inscripcion.emailEstado === 'enviado',
      urlDetalle: this.#urlDetalle(inscripcion.codigo),
    };
  }

  #obtenerActividad(id) {
    const actividad = buscarActividad(id);
    if (!actividad) throw new ErrorNoEncontrado('La actividad seleccionada no existe.');
    return actividad;
  }

  /** Rechaza si algún DNI del grupo ya tiene una inscripción en la misma fecha y hora, en cualquier actividad. */
  #validarSinSuperposicion(s) {
    const dnis = s.participantes.map((p) => String(p.dni).trim());
    const yaInscriptos = new Set(this.repositorio.dnisInscriptosEnHorario(s.fecha, s.horario, dnis));
    const errores = [];
    dnis.forEach((dni, i) => {
      if (yaInscriptos.has(dni)) {
        errores.push({
          campo: `participantes[${i}].dni`,
          mensaje: `Esta persona ya está inscripta en otra actividad a las ${s.horario} hs de ese día.`,
        });
      }
    });
    if (errores.length) throw new ErrorValidacion(errores);
  }

  #validarDatos(s, actividad) {
    const errores = [];
    const err = (campo, mensaje) => errores.push({ campo, mensaje });

    if (!parsearFecha(s.fecha)) err('fecha', 'Seleccioná una fecha válida.');
    if (!esHoraValida(s.horario)) err('horario', 'Seleccioná un horario.');

    const cantidadOk = Number.isInteger(s.cantidadPersonas) && s.cantidadPersonas >= 1;
    if (!cantidadOk) {
      err('cantidadPersonas', 'Indicá cuántas personas participan (al menos 1).');
    }

    const participantes = Array.isArray(s.participantes) ? s.participantes : [];
    if (cantidadOk && participantes.length !== s.cantidadPersonas) {
      err('participantes', `Cargá los datos de las ${s.cantidadPersonas} persona(s).`);
    }

    const dnis = new Set();
    participantes.forEach((p = {}, i) => {
      const campo = (c) => `participantes[${i}].${c}`;
      if (typeof p.nombre !== 'string' || p.nombre.trim().length < 2) {
        err(campo('nombre'), 'Ingresá el nombre.');
      }
      const dni = String(p.dni ?? '').trim();
      if (!REGEX_DNI.test(dni)) {
        err(campo('dni'), 'El DNI debe tener de 6 a 8 números, sin puntos.');
      } else if (dnis.has(dni)) {
        err(campo('dni'), 'Este DNI ya está cargado en la inscripción.');
      } else {
        dnis.add(dni);
      }
      const edad = Number(p.edad);
      if (p.edad === '' || p.edad === null || !Number.isInteger(edad) || edad < 0) {
        err(campo('edad'), 'Ingresá una edad válida.');
      } else if (edad > EDAD_MAXIMA) {
        err(campo('edad'), `La edad máxima para participar es ${EDAD_MAXIMA} años.`);
      } else if (edad < actividad.edadMinima) {
        err(campo('edad'), `${actividad.nombre} es para personas de ${actividad.edadMinima} años o más.`);
      }
      if (actividad.requiereTalla && !TALLAS_VALIDAS.includes(p.talla)) {
        err(campo('talla'), `${actividad.nombre} requiere seleccionar la talla de vestimenta.`);
      }
    });

    if (s.aceptaTerminos !== true) {
      err('aceptaTerminos', 'Tenés que aceptar los términos y condiciones de la actividad.');
    }
    if (typeof s.email !== 'string' || !REGEX_EMAIL.test(s.email.trim())) {
      err('email', 'Ingresá un email válido para recibir la confirmación.');
    }
    return errores;
  }

  #validarDisponibilidad(actividad, fecha, horario) {
    if (!parqueAbiertoEnFecha(fecha)) {
      throw new ErrorNoDisponible(`El parque está cerrado el ${fecha}. Abre de martes a domingo.`);
    }
    if (!parqueAbiertoEnHora(horario)) {
      throw new ErrorNoDisponible(`El parque está cerrado a las ${horario}.`);
    }
    if (!actividad.horarios.includes(horario)) {
      throw new ErrorNoDisponible(`${actividad.nombre} no está disponible a las ${horario}.`);
    }
    const ventana = estadoVentanaInscripcion(fecha, horario, this.reloj());
    if (ventana === 'cerrada') {
      throw new ErrorNoDisponible(
        `La inscripción a ese turno ya cerró: cierra ${MINUTOS_CIERRE_INSCRIPCION} minutos antes del inicio.`
      );
    }
    if (ventana === 'no_habilitada') {
      throw new ErrorNoDisponible(
        `Todavía no podés inscribirte a ese turno: la inscripción se habilita ${HORAS_ANTICIPACION_MAXIMA} hs antes del inicio.`
      );
    }
  }
}

module.exports = { InscripcionService, fechaLegible };
