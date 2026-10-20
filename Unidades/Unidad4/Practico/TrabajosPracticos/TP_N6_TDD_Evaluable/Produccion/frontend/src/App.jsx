import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { FormularioProvider } from './estado.jsx';
import Formulario from './paginas/Formulario.jsx';
import Terminos from './paginas/Terminos.jsx';
import DetalleInscripcion from './paginas/DetalleInscripcion.jsx';
import Inscripciones from './paginas/Inscripciones.jsx';

/** Rutas de la aplicación. */
export default function App() {
  return (
    <FormularioProvider>
      <SubirAlCambiarDePagina />
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/terminos/:actividadId" element={<Terminos />} />
        <Route path="/inscripcion/:codigo" element={<DetalleInscripcion />} />
        <Route path="/inscripciones" element={<Inscripciones />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FormularioProvider>
  );
}

function SubirAlCambiarDePagina() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (!state?.irA) window.scrollTo(0, 0);
  }, [pathname, state]);
  return null;
}
