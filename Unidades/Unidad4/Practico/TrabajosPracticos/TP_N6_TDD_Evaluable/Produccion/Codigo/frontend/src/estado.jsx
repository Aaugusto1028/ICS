import { createContext, useContext, useState } from 'react';
import { participanteVacio } from './validacion.js';

/*
 * Estado del formulario compartido entre páginas.
 * Así, si el visitante va a leer los términos y condiciones y vuelve,
 * no pierde lo que ya había cargado.
 */

export const FORM_INICIAL = {
  actividadId: '',
  fecha: '',
  horario: '',
  cantidadPersonas: 1,
  participantes: [participanteVacio()],
  aceptaTerminos: false,
  email: '',
};

const ContextoFormulario = createContext(null);

export function FormularioProvider({ children }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const reiniciar = () => setForm(FORM_INICIAL);
  return <ContextoFormulario.Provider value={{ form, setForm, reiniciar }}>{children}</ContextoFormulario.Provider>;
}

export function useFormulario() {
  return useContext(ContextoFormulario);
}
