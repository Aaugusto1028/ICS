import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { obtenerActividad } from '../api.js';
import { useFormulario } from '../estado.jsx';
import Encabezado from '../componentes/Encabezado.jsx';

/** Página con los términos y condiciones completos de una actividad. */
export default function Terminos() {
  const { actividadId } = useParams();
  const navigate = useNavigate();
  const { setForm } = useFormulario();
  const [actividad, setActividad] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerActividad(actividadId)
      .then(setActividad)
      .catch((e) => setError(e.status === 404 ? 'La actividad no existe.' : e.message));
  }, [actividadId]);

  const volver = () => navigate('/', { state: { irA: 'seccion-terminos' } });

  const aceptar = () => {
    // Marca el check en el formulario. Si estaba eligiendo otra actividad, pasa a esta.
    setForm((f) =>
      f.actividadId === actividadId
        ? { ...f, aceptaTerminos: true }
        : { ...f, actividadId, horario: '', aceptaTerminos: true }
    );
    volver();
  };

  return (
    <div className="pagina">
      <Encabezado titulo="Términos y condiciones" subtitulo={actividad ? `Actividad: ${actividad.nombre}` : null} />

      <main className="pagina-angosta">
        <Link to="/" state={{ irA: 'seccion-terminos' }} className="volver">
          ← Volver al formulario
        </Link>

        {error && <div className="alerta" role="alert">{error}</div>}
        {!actividad && !error && <p className="texto-suave">Cargando…</p>}

        {actividad && (
          <article className="seccion documento">
            <p className="texto-suave version">Versión {actividad.versionTerminos}</p>

            <h2>Condiciones de {actividad.nombre}</h2>
            <ol>
              {actividad.terminos.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>

            {actividad.requiereTalla && (
              <p className="nota-documento">
                <b>Vestimenta:</b> {actividad.motivoTalla} La talla se declara por participante al inscribirse.
              </p>
            )}

            <h2>Condiciones generales del parque</h2>
            <ol>
              {actividad.terminosGenerales.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>

            <div className="acciones-documento">
              <button type="button" className="boton-secundario" onClick={volver}>
                Volver sin aceptar
              </button>
              <button type="button" className="boton-primario boton-auto" onClick={aceptar}>
                Acepto los términos y condiciones
              </button>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
