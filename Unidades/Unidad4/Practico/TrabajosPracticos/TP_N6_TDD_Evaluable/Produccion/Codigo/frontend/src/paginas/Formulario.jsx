import { cloneElement, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { obtenerActividades, obtenerFechas, obtenerDisponibilidad, crearInscripcion } from '../api.js';
import { validarFormulario, ajustarParticipantes, armarSolicitud, textoEdad, EDAD_MAXIMA } from '../validacion.js';
import { useFormulario } from '../estado.jsx';
import { formatearFechaLarga } from '../fechas.js';
import { IconoActividad } from '../Iconos.jsx';
import Encabezado from '../componentes/Encabezado.jsx';

export default function Formulario() {
  const { form, setForm, reiniciar } = useFormulario();
  const navigate = useNavigate();
  const location = useLocation();

  const [actividades, setActividades] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [cargandoActividades, setCargandoActividades] = useState(true);
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [intentoEnviar, setIntentoEnviar] = useState(false);
  const [erroresServidor, setErroresServidor] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [enviando, setEnviando] = useState(false);

  const actividad = actividades.find((a) => a.id === form.actividadId) || null;
  const turno = disponibilidad?.horarios.find((h) => h.horario === form.horario) || null;
  // Sin máximo por inscripción: el tope es el cupo libre del turno elegido (o el cupo total si todavía no eligió).
  const maxPersonas = Math.max(1, turno ? turno.cuposRestantes : actividad?.cupoPorHorario || 1);

  const erroresCliente = useMemo(() => validarFormulario(form, actividad), [form, actividad]);
  const errores = intentoEnviar ? { ...erroresCliente, ...erroresServidor } : erroresServidor;
  const errorDe = (campo) => errores[campo];

  useEffect(() => {
    obtenerActividades()
      .then(setActividades)
      .catch((e) => setErrorGeneral(e.message))
      .finally(() => setCargandoActividades(false));
    obtenerFechas()
      .then((lista) => {
        setFechas(lista);
        // Si quedó elegida una fecha que ya no se puede elegir (por ejemplo, de ayer), se descarta.
        setForm((f) => (f.fecha && !lista.some((x) => x.fecha === f.fecha && x.parqueAbierto) ? { ...f, fecha: '', horario: '' } : f));
      })
      .catch((e) => setErrorGeneral(e.message));
  }, []);

  // Al volver de la página de términos, llevar al visitante a esa sección
  useEffect(() => {
    if (location.state?.irA && !cargandoActividades) {
      document.getElementById(location.state.irA)?.scrollIntoView({ block: 'center' });
    }
  }, [location.state, cargandoActividades]);

  const cargarDisponibilidad = (actividadId, fecha) => {
    if (!actividadId || !fecha) return setDisponibilidad(null);
    setCargandoHorarios(true);
    obtenerDisponibilidad(actividadId, fecha)
      .then(setDisponibilidad)
      .catch((e) => setErrorGeneral(e.message))
      .finally(() => setCargandoHorarios(false));
  };
  useEffect(() => {
    cargarDisponibilidad(form.actividadId, form.fecha);
  }, [form.actividadId, form.fecha]);

  const actualizar = (cambios) => {
    setForm((f) => ({ ...f, ...cambios }));
    const campos = Object.keys(cambios);
    setErroresServidor((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !campos.some((c) => k.startsWith(c)))));
    setErrorGeneral('');
  };

  const elegirActividad = (id) => {
    if (id === form.actividadId) return;
    // Los términos son propios de cada actividad: al cambiarla hay que volver a aceptarlos.
    actualizar({ actividadId: id, horario: '', aceptaTerminos: false });
  };

  const cambiarCantidad = (n) => {
    const cantidad = Math.min(maxPersonas, Math.max(1, n));
    actualizar({ cantidadPersonas: cantidad, participantes: ajustarParticipantes(form.participantes, cantidad) });
  };

  const actualizarParticipante = (i, campo, valor) => {
    setForm((f) => ({ ...f, participantes: f.participantes.map((p, j) => (j === i ? { ...p, [campo]: valor } : p)) }));
    setErroresServidor((e) => {
      const copia = { ...e };
      delete copia[`participantes[${i}].${campo}`];
      return copia;
    });
  };

  const enviar = async (ev) => {
    ev.preventDefault();
    setIntentoEnviar(true);
    setErrorGeneral('');
    if (Object.keys(erroresCliente).length) {
      setErrorGeneral(
        erroresCliente.aceptaTerminos && Object.keys(erroresCliente).length === 1
          ? 'Para registrar la inscripción tenés que aceptar los términos y condiciones.'
          : 'Revisá los campos marcados en rojo.'
      );
      requestAnimationFrame(() => document.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    setEnviando(true);
    try {
      const resultado = await crearInscripcion(armarSolicitud(form, actividad));
      reiniciar();
      navigate(`/inscripcion/${resultado.codigo}`, { state: { resultado, recienCreada: true } });
    } catch (e) {
      const porCampo = Object.fromEntries((e.detalles || []).filter((d) => d.campo).map((d) => [d.campo, d.mensaje]));
      setErroresServidor(porCampo);
      setErrorGeneral(e.message);
      // Sin cupo o no disponible: refrescamos los horarios para que el visitante vea el estado real.
      if (e.status === 409 || e.status === 422) {
        cargarDisponibilidad(form.actividadId, form.fecha);
        setErroresServidor((x) => ({ ...x, horario: e.message }));
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="pagina">
      <Encabezado />

      <form className="layout" onSubmit={enviar} noValidate>
        <div className="columna-form">
          {/* 1. Actividad */}
          <Seccion numero="1" titulo="Elegí la actividad" error={errorDe('actividadId')}>
            {cargandoActividades ? (
              <p className="texto-suave">Cargando actividades…</p>
            ) : (
              <div className="grilla-actividades" role="radiogroup" aria-label="Actividad">
                {actividades.map((a) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={form.actividadId === a.id}
                    key={a.id}
                    className={`tarjeta-actividad ${form.actividadId === a.id ? 'seleccionada' : ''}`}
                    onClick={() => elegirActividad(a.id)}
                  >
                    <span className="icono-actividad">
                      <IconoActividad id={a.id} />
                    </span>
                    <span className="nombre-actividad">{a.nombre}</span>
                    <span className="desc-actividad">{a.descripcion}</span>
                    <span className="etiquetas">
                      <span className="etiqueta">{a.cupoPorHorario} lugares por turno</span>
                      <span className="etiqueta">{textoEdad(a)}</span>
                      {a.requiereTalla && <span className="etiqueta etiqueta-talla">Requiere talla</span>}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </Seccion>

          {/* 2. Fecha y horario */}
          <Seccion numero="2" titulo="Fecha y horario" error={errorDe('horario') || errorDe('fecha')}>
            {/* Solo hoy y mañana: la inscripción se habilita 24 hs antes de cada turno.
                Los días en que el parque cierra se muestran deshabilitados. */}
            <div className="grilla-fechas" role="radiogroup" aria-label="Fecha">
              {fechas.map((f, i) => (
                <button
                  type="button"
                  role="radio"
                  key={f.fecha}
                  aria-checked={form.fecha === f.fecha}
                  aria-invalid={!!errorDe('fecha')}
                  disabled={!actividad || !f.parqueAbierto}
                  className={`chip-horario chip-fecha ${form.fecha === f.fecha ? 'seleccionado' : ''}`}
                  onClick={() => actualizar({ fecha: f.fecha, horario: '' })}
                >
                  <span className="hora">{i === 0 ? 'Hoy' : 'Mañana'}</span>
                  <span className="cupos">{f.parqueAbierto ? formatearFechaLarga(f.fecha) : `${formatearFechaLarga(f.fecha)} · Parque cerrado`}</span>
                </button>
              ))}
            </div>
            <p className="texto-suave nota">
              La inscripción a cada turno se habilita 24 hs antes y cierra 15 minutos antes de que empiece. El parque cierra los lunes, el 25/12 y el 01/01.
            </p>

            {!actividad && <p className="texto-suave">Primero elegí una actividad.</p>}
            {actividad && !form.fecha && <p className="texto-suave">Elegí una fecha para ver los horarios.</p>}
            {cargandoHorarios && <p className="texto-suave">Consultando cupos…</p>}

            {disponibilidad && !cargandoHorarios && !disponibilidad.parqueAbierto && (
              <div className="aviso">El parque está cerrado ese día (cierra los lunes, el 25/12 y el 01/01). Elegí otra fecha.</div>
            )}

            {disponibilidad && !cargandoHorarios && disponibilidad.parqueAbierto && (
              <div className="grilla-horarios" role="radiogroup" aria-label="Horario">
                {disponibilidad.horarios.map((h) => {
                  const motivo =
                    h.inscripcion === 'cerrada'
                      ? 'Cerrada'
                      : h.inscripcion === 'no_habilitada'
                        ? 'Todavía no'
                        : h.cuposRestantes === 0
                          ? 'Sin cupo'
                          : !h.disponible
                            ? 'No disponible'
                            : null;
                  return (
                    <button
                      type="button"
                      role="radio"
                      key={h.horario}
                      aria-checked={form.horario === h.horario}
                      disabled={!h.disponible}
                      aria-invalid={!!errorDe('horario')}
                      className={`chip-horario ${form.horario === h.horario ? 'seleccionado' : ''}`}
                      onClick={() => actualizar({ horario: h.horario })}
                    >
                      <span className="hora">{h.horario}</span>
                      <span className="cupos">{motivo || `${h.cuposRestantes} ${h.cuposRestantes === 1 ? 'lugar' : 'lugares'}`}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </Seccion>

          {/* 3. Participantes */}
          <Seccion numero="3" titulo="¿Quiénes participan?" error={errorDe('cantidadPersonas') || errorDe('participantes')}>
            <div className="fila-cantidad">
              <span id="lbl-cantidad">Cantidad de personas</span>
              <div className="stepper" role="group" aria-labelledby="lbl-cantidad">
                <button type="button" aria-label="Quitar una persona" onClick={() => cambiarCantidad(form.cantidadPersonas - 1)} disabled={form.cantidadPersonas <= 1}>
                  −
                </button>
                <output aria-live="polite">{form.cantidadPersonas}</output>
                <button type="button" aria-label="Agregar una persona" onClick={() => cambiarCantidad(form.cantidadPersonas + 1)} disabled={form.cantidadPersonas >= maxPersonas}>
                  +
                </button>
              </div>
            </div>
            {turno && form.cantidadPersonas > turno.cuposRestantes && (
              <div className="aviso">Ese horario tiene {turno.cuposRestantes} lugar(es) libre(s). Reducí la cantidad o elegí otro horario.</div>
            )}

            <div className="lista-participantes">
              {form.participantes.map((p, i) => (
                <fieldset className="participante" key={i}>
                  <legend>Persona {i + 1}</legend>
                  <div className={`grilla-participante ${actividad?.requiereTalla ? 'con-talla' : ''}`}>
                    <Campo label="Nombre y apellido" error={errorDe(`participantes[${i}].nombre`)} className="campo-nombre">
                      <input value={p.nombre} autoComplete="name" onChange={(e) => actualizarParticipante(i, 'nombre', e.target.value)} />
                    </Campo>
                    <Campo label="DNI" error={errorDe(`participantes[${i}].dni`)}>
                      <input value={p.dni} inputMode="numeric" maxLength={8} placeholder="Sin puntos" onChange={(e) => actualizarParticipante(i, 'dni', e.target.value.replace(/\D/g, ''))} />
                    </Campo>
                    <Campo label="Edad" error={errorDe(`participantes[${i}].edad`)}>
                      <input type="number" min={actividad?.edadMinima || 0} max={EDAD_MAXIMA} inputMode="numeric" value={p.edad} onChange={(e) => actualizarParticipante(i, 'edad', e.target.value)} />
                    </Campo>
                    {actividad?.requiereTalla && (
                      <Campo label="Talla" error={errorDe(`participantes[${i}].talla`)}>
                        <select value={p.talla} onChange={(e) => actualizarParticipante(i, 'talla', e.target.value)}>
                          <option value="">Elegir…</option>
                          {actividad.tallas.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </Campo>
                    )}
                  </div>
                </fieldset>
              ))}
            </div>
            {actividad?.edadMinima > 0 && <p className="texto-suave nota">{actividad.nombre} es para personas de {actividad.edadMinima} años o más.</p>}
            {actividad?.requiereTalla && <p className="texto-suave nota">{actividad.motivoTalla}</p>}
          </Seccion>

          {/* 4. Contacto y términos */}
          <Seccion numero="4" titulo="Email y confirmación">
            <Campo label="Email para recibir la confirmación y el código QR" error={errorDe('email')}>
              <input type="email" autoComplete="email" placeholder="nombre@correo.com" value={form.email} onChange={(e) => actualizar({ email: e.target.value })} />
            </Campo>

            <div id="seccion-terminos" className={`caja-terminos ${errorDe('aceptaTerminos') ? 'con-error' : ''}`}>
              <label className="check">
                <input
                  type="checkbox"
                  checked={form.aceptaTerminos}
                  disabled={!actividad}
                  aria-invalid={!!errorDe('aceptaTerminos')}
                  aria-describedby="ayuda-terminos"
                  onChange={(e) => actualizar({ aceptaTerminos: e.target.checked })}
                />
                <span>
                  {actividad ? (
                    <>
                      Leí y acepto los{' '}
                      <Link to={`/terminos/${actividad.id}`} className="link-terminos">
                        términos y condiciones
                      </Link>{' '}
                      de <b>{actividad.nombre}</b>.
                    </>
                  ) : (
                    <>Leí y acepto los términos y condiciones de la actividad.</>
                  )}
                </span>
              </label>
              <p id="ayuda-terminos" className="texto-suave nota">
                {actividad
                  ? 'Hacé clic en “términos y condiciones” para leerlos completos. No se puede registrar la inscripción sin aceptarlos.'
                  : 'Elegí una actividad para ver y aceptar sus términos y condiciones.'}
              </p>
              {errorDe('aceptaTerminos') && <p className="error-campo">{errorDe('aceptaTerminos')}</p>}
            </div>
          </Seccion>

          {/* Mismo botón que el del resumen, al final del recorrido vertical */}
          <div className="cierre-formulario">
            {errorGeneral && <div className="alerta" role="alert">{errorGeneral}</div>}
            <button type="submit" className="boton-primario" disabled={enviando}>
              {enviando ? 'Registrando…' : 'Registrar inscripción'}
            </button>
          </div>
        </div>

        {/* Resumen lateral */}
        <aside className="resumen">
          <h2>Tu reserva</h2>
          <dl>
            <div><dt>Actividad</dt><dd>{actividad?.nombre || '—'}</dd></div>
            <div><dt>Fecha</dt><dd>{formatearFechaLarga(form.fecha) || '—'}</dd></div>
            <div><dt>Horario</dt><dd>{form.horario ? `${form.horario} hs` : '—'}</dd></div>
            <div><dt>Personas</dt><dd>{form.cantidadPersonas}</dd></div>
            <div><dt>Términos</dt><dd className={form.aceptaTerminos ? 'ok' : ''}>{form.aceptaTerminos ? 'Aceptados' : 'Sin aceptar'}</dd></div>
          </dl>
          {errorGeneral && <div className="alerta" role="alert">{errorGeneral}</div>}
          <button type="submit" className="boton-primario" disabled={enviando}>
            {enviando ? 'Registrando…' : 'Registrar inscripción'}
          </button>
          <p className="texto-suave nota">Te enviaremos un email con el detalle y un código QR para presentar en el ingreso.</p>
        </aside>
      </form>
    </div>
  );
}

function Seccion({ numero, titulo, error, children }) {
  return (
    <section className={`seccion ${error ? 'con-error' : ''}`}>
      <h2>
        <span className="numero">{numero}</span>
        {titulo}
      </h2>
      {children}
      {error && <p className="error-campo">{error}</p>}
    </section>
  );
}

function Campo({ label, error, className = '', children }) {
  // Inyecta aria-invalid en el input hijo sin repetir código
  const hijo = cloneElement(children, { 'aria-invalid': !!error });
  return (
    <label className={`campo ${className} ${error ? 'con-error' : ''}`}>
      <span>{label}</span>
      {hijo}
      {error && <small className="error-campo">{error}</small>}
    </label>
  );
}
