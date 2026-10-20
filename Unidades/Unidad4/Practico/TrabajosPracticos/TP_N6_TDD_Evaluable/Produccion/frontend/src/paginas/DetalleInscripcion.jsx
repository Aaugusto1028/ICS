import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { obtenerInscripcion } from '../api.js';
import { formatearFechaLarga } from '../fechas.js';
import Encabezado from '../componentes/Encabezado.jsx';

/** Detalle de una inscripción: se muestra al confirmarla y también desde el link del QR o del email. */
export default function DetalleInscripcion() {
  const { codigo } = useParams();
  const { state } = useLocation();
  const recienCreada = state?.recienCreada && state?.resultado?.codigo === codigo;
  const [inscripcion, setInscripcion] = useState(recienCreada ? state.resultado : null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (inscripcion?.codigo === codigo) return;
    obtenerInscripcion(codigo)
      .then(setInscripcion)
      .catch((e) => setError(e.status === 404 ? 'No encontramos una inscripción con ese código.' : e.message));
  }, [codigo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="pagina">
      <Encabezado titulo={recienCreada ? '¡Inscripción registrada!' : 'Detalle de la inscripción'} subtitulo={null} />

      <main className="confirmacion">
        {error && (
          <>
            <div className="alerta" role="alert">{error}</div>
            <Link to="/" className="boton-secundario boton-enlace">Ir al formulario</Link>
          </>
        )}
        {!inscripcion && !error && <p className="texto-suave">Cargando…</p>}

        {inscripcion && (
          <>
            {recienCreada && (
              <div className="check-ok" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            )}
            <h2>{inscripcion.actividad.nombre}</h2>
            {recienCreada && <EstadoEmail inscripcion={inscripcion} />}

            <img className="qr" src={inscripcion.qr} alt={`Código QR de la inscripción ${inscripcion.codigo}`} />
            <p className="codigo">{inscripcion.codigo}</p>
            <p className="texto-suave nota">Escaneá el QR con la cámara del celular (o con Google Lens) para ver el detalle de la inscripción.</p>

            <dl className="detalle">
              <div><dt>Fecha</dt><dd>{formatearFechaLarga(inscripcion.fecha, { conAnio: true })}</dd></div>
              <div><dt>Horario</dt><dd>{inscripcion.horario} hs</dd></div>
              <div><dt>Personas</dt><dd>{inscripcion.cantidadPersonas}</dd></div>
              <div><dt>Email</dt><dd>{inscripcion.email}</dd></div>
              <div><dt>Términos</dt><dd className="ok">Aceptados</dd></div>
            </dl>

            <table className="tabla-participantes">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>Edad</th>
                  {inscripcion.actividad.requiereTalla && <th>Talla</th>}
                </tr>
              </thead>
              <tbody>
                {inscripcion.participantes.map((p) => (
                  <tr key={p.dni}>
                    <td>{p.nombre}</td>
                    <td>{p.dni}</td>
                    <td>{p.edad}</td>
                    {inscripcion.actividad.requiereTalla && <td>{p.talla}</td>}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="acciones-documento centrado">
              <Link to="/" className="boton-secundario boton-enlace">Hacer otra inscripción</Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function EstadoEmail({ inscripcion }) {
  switch (inscripcion.emailEstado) {
    case 'enviado':
      return (
        <p className="estado-email ok-fondo">
          Enviamos el detalle y el código QR a <b>{inscripcion.email}</b>. Si no lo ves, revisá la carpeta de spam.
        </p>
      );
    case 'guardado_en_archivo':
      return (
        <p className="estado-email aviso">
          <b>Modo de prueba:</b> el servidor no tiene configurado el envío de mails, así que el email para{' '}
          <b>{inscripcion.email}</b> se guardó en <code>backend/outbox/</code> en lugar de enviarse.
        </p>
      );
    case 'error':
      return (
        <p className="estado-email alerta">
          Tu lugar quedó reservado, pero no pudimos enviar el email a <b>{inscripcion.email}</b>. Guardá este QR.
        </p>
      );
    default:
      return null;
  }
}
