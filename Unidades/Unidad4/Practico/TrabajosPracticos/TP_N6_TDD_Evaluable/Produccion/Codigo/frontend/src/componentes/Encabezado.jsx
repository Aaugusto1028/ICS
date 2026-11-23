import { Link, NavLink } from 'react-router-dom';

export default function Encabezado({ titulo = 'Inscribite a una actividad', subtitulo = 'Reservá tu lugar en Tirolesa, Safari, Palestra o Jardinería en cuatro pasos.' }) {
  return (
    <header className="encabezado">
      <div className="encabezado-contenido">
        <div className="fila-superior">
          <Link to="/" className="marca">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M5 21c0-8 5-14 15-16-1 9-6 15-15 16Z" fill="currentColor" opacity=".9" />
              <path d="M5 21 14 11" stroke="rgb(255,255,255)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            EcoHarmony Park
          </Link>
          <nav className="pestanas" aria-label="Secciones">
            <NavLink to="/" end className={({ isActive }) => `pestana ${isActive ? 'activa' : ''}`}>
              Inscribirme
            </NavLink>
            <NavLink to="/inscripciones" className={({ isActive }) => `pestana ${isActive ? 'activa' : ''}`}>
              Inscripciones
            </NavLink>
          </nav>
        </div>
        <h1>{titulo}</h1>
        {subtitulo && <p>{subtitulo}</p>}
      </div>
    </header>
  );
}
