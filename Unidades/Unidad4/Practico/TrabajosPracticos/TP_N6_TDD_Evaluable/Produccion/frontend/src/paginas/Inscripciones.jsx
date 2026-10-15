import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { obtenerActividades, obtenerDisponibilidad, listarInscripciones } from '../api.js';
import { formatearFechaLarga } from '../fechas.js';
import { textoEdad } from '../validacion.js';
import { IconoActividad } from '../Iconos.jsx';
import Encabezado from '../componentes/Encabezado.jsx';

const INTERVALO_ACTUALIZACION_MS = 5000;
const MINUTOS_NUEVA = 2;

const ESTADOS_MAIL = {
  enviado: { texto: 'Mail enviado', clase: 'insignia-ok' },
  guardado_en_archivo: { texto: 'Mail en outbox', clase: 'insignia-aviso' },
  error: { texto: 'Mail con error', clase: 'insignia-error' },
  pendiente: { texto: 'Mail pendiente', clase: 'insignia-neutra' },
};

function horaRegistro(iso) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm} ${d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}`;
}

function esNueva(iso) {
  return Date.now() - new Date(iso).getTime() < MINUTOS_NUEVA * 60 * 1000;
}

/** Pestaña "Inscripciones": detalle de cada actividad y de las inscripciones registradas. */
export default function Inscripciones() {
  const [params, setParams] = useSearchParams();
  const [actividades, setActividades] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [fecha, setFecha] = useState(null); // null = todavía no elegida; '' = todas las fechas
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const [error, setError] = useState('');
  const fechaElegidaPorUsuario = useRef(false);

  const actividadId = params.get('actividad') || actividades[0]?.id || '';
  const actividad = actividades.find((a) => a.id === actividadId) || null;

  const cargarInscripciones = () =>
    listarInscripciones()
      .then((lista) => {
        setInscripciones(lista);
        setUltimaActualizacion(new Date());
        setError('');
      })
      .catch((e) => setError(e.message));

  // Carga inicial + actualización automática
  useEffect(() => {
    obtenerActividades().then(setActividades).catch((e) => setError(e.message));
    cargarInscripciones();
    const id = setInterval(cargarInscripciones, INTERVALO_ACTUALIZACION_MS);
    return () => clearInterval(id);
  }, []);

  const deLaActividad = useMemo(
    () => inscripciones.filter((i) => i.actividadId === actividadId),
    [inscripciones, actividadId]
  );

  const fechasConInscripciones = useMemo(
    () => [...new Set(deLaActividad.map((i) => i.fecha))].sort(),
    [deLaActividad]
  );

  // Al cambiar de actividad, mostrar la fecha de su última inscripción (si el usuario no eligió otra)
  useEffect(() => {
    fechaElegidaPorUsuario.current = false;
    setFecha(null);
  }, [actividadId]);

  useEffect(() => {
    if (fechaElegidaPorUsuario.current) return;
    setFecha(deLaActividad[0]?.fecha ?? '');
  }, [deLaActividad]);

  // Ocupación por turno de la fecha elegida (se refresca junto con las inscripciones)
  useEffect(() => {
    if (!actividadId || !fecha) return setDisponibilidad(null);
    obtenerDisponibilidad(actividadId, fecha).then(setDisponibilidad).catch(() => setDisponibilidad(null));
  }, [actividadId, fecha, inscripciones]);

  const visibles = fecha ? deLaActividad.filter((i) => i.fecha === fecha) : deLaActividad;

  const resumen = (id) => {
    const lista = inscripciones.filter((i) => i.actividadId === id);
    return { inscripciones: lista.length, personas: lista.reduce((t, i) => t + i.cantidadPersonas, 0) };
  };

  const elegirFecha = (valor) => {
    fechaElegidaPorUsuario.current = true;
    setFecha(valor);
  };

  return (
    <div className="pagina">
      <Encabezado titulo="Inscripciones" subtitulo="Detalle de cada actividad y de las inscripciones registradas en el sistema." />

      <main className="contenedor-panel">
        <div className="barra-actualizacion">
          <span className="punto-vivo" aria-hidden="true" />
          <span>
            Se actualiza sola cada {INTERVALO_ACTUALIZACION_MS / 1000} segundos
            {ultimaActualizacion && ` · última actualización ${ultimaActualizacion.toLocaleTimeString('es-AR', { hourCycle: 'h23' })}`}
          </span>
          <button type="button" className="link" onClick={cargarInscripciones}>
            Actualizar ahora
          </button>
        </div>

        {error && <div className="alerta" role="alert">{error}</div>}

        {/* Resumen por actividad */}
        <div className="grilla-resumen" role="tablist" aria-label="Actividades">
          {actividades.map((a) => {
            const r = resumen(a.id);
            return (
              <button
                key={a.id}
                type="button"
                role="tab"
                aria-selected={a.id === actividadId}
                className={`tarjeta-resumen ${a.id === actividadId ? 'seleccionada' : ''}`}
                onClick={() => setParams({ actividad: a.id })}
              >
                <span className="icono-actividad">
                  <IconoActividad id={a.id} />
                </span>
                <span className="nombre-actividad">{a.nombre}</span>
                <span className="cifras">
                  <span><b>{r.inscripciones}</b> {r.inscripciones === 1 ? 'inscripción' : 'inscripciones'}</span>
                  <span><b>{r.personas}</b> {r.personas === 1 ? 'persona' : 'personas'}</span>
                </span>
              </button>
            );
          })}
        </div>

        {actividad && (
          <section className="seccion detalle-actividad" role="tabpanel">
            <div className="cabecera-detalle">
              <div>
                <h2>{actividad.nombre}</h2>
                <p className="texto-suave">{actividad.descripcion}</p>
              </div>
              <dl className="ficha">
                <div><dt>Cupo por turno</dt><dd>{actividad.cupoPorHorario}</dd></div>
                <div><dt>Turnos</dt><dd>{actividad.horarios.join(' · ')}</dd></div>
                <div><dt>Talla</dt><dd>{actividad.requiereTalla ? 'Requerida' : 'No requerida'}</dd></div>
                <div><dt>Edad</dt><dd>{textoEdad(actividad)}</dd></div>
              </dl>
            </div>

            <div className="filtro-fecha">
              <label htmlFor="fecha-panel">Fecha</label>
              <select id="fecha-panel" value={fecha ?? ''} onChange={(e) => elegirFecha(e.target.value)}>
                <option value="">Todas las fechas</option>
                {fechasConInscripciones.map((f) => (
                  <option key={f} value={f}>{formatearFechaLarga(f, { conAnio: true })}</option>
                ))}
              </select>
            </div>

            {/* Ocupación por turno */}
            {fecha && disponibilidad && (
              <div className="ocupacion">
                <h3>Ocupación por turno · {formatearFechaLarga(fecha)}</h3>
                <div className="grilla-ocupacion">
                  {disponibilidad.horarios.map((h) => {
                    const ocupados = h.cupoTotal - h.cuposRestantes;
                    const porcentaje = Math.round((ocupados / h.cupoTotal) * 100);
                    return (
                      <div key={h.horario} className={`turno ${h.cuposRestantes === 0 ? 'lleno' : ''}`}>
                        <div className="turno-cabecera">
                          <span className="hora">{h.horario}</span>
                          <span className="texto-suave">{ocupados}/{h.cupoTotal}</span>
                        </div>
                        <div className="barra" role="progressbar" aria-valuenow={ocupados} aria-valuemin={0} aria-valuemax={h.cupoTotal} aria-label={`Turno ${h.horario}: ${ocupados} de ${h.cupoTotal} lugares ocupados`}>
                          <span style={{ width: `${porcentaje}%` }} />
                        </div>
                        <span className="texto-suave nota">{h.cuposRestantes === 0 ? 'Sin cupo' : `${h.cuposRestantes} libres`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {!fecha && deLaActividad.length > 0 && (
              <p className="texto-suave nota">Elegí una fecha para ver la ocupación de cada turno.</p>
            )}

            {/* Lista de inscripciones */}
            <h3 className="titulo-lista">
              Inscripciones {fecha ? `del ${formatearFechaLarga(fecha)}` : ''} <span className="contador">{visibles.length}</span>
            </h3>

            {visibles.length === 0 ? (
              <div className="vacio">
                <p>Todavía no hay inscripciones para {actividad.nombre}.</p>
                <Link to="/" className="boton-secundario boton-enlace">Hacer una inscripción</Link>
              </div>
            ) : (
              <div className="tabla-scroll">
                <table className="tabla-inscripciones">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Fecha</th>
                      <th>Horario</th>
                      <th>Personas</th>
                      <th>Participantes</th>
                      <th>Email</th>
                      <th>Mail</th>
                      <th>Registrada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibles.map((i) => {
                      const estado = ESTADOS_MAIL[i.emailEstado] || ESTADOS_MAIL.pendiente;
                      return (
                        <tr key={i.codigo} className={esNueva(i.creadaEn) ? 'fila-nueva' : ''}>
                          <td>
                            <Link to={`/inscripcion/${i.codigo}`} className="codigo-link">{i.codigo}</Link>
                            {esNueva(i.creadaEn) && <span className="insignia insignia-nueva">Nueva</span>}
                          </td>
                          <td>{i.fecha.split('-').reverse().join('/')}</td>
                          <td>{i.horario} hs</td>
                          <td className="centrado">{i.cantidadPersonas}</td>
                          <td>
                            <ul className="lista-participantes-tabla">
                              {i.participantes.map((p) => (
                                <li key={p.dni}>
                                  {p.nombre} <span className="texto-suave">({p.edad} años{p.talla ? ` · talla ${p.talla}` : ''})</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>{i.email}</td>
                          <td><span className={`insignia ${estado.clase}`}>{estado.texto}</span></td>
                          <td className="texto-suave">{horaRegistro(i.creadaEn)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
