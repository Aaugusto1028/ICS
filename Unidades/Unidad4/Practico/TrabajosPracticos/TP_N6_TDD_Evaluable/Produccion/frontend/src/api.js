const BASE = import.meta.env.VITE_API_URL || '/api';

/** Error de la API con el código HTTP y los detalles por campo. */
export class ErrorApi extends Error {
  constructor(status, cuerpo) {
    super(cuerpo?.mensaje || 'No se pudo conectar con el servidor.');
    this.status = status;
    this.codigo = cuerpo?.codigo;
    this.detalles = cuerpo?.detalles || [];
  }
}

async function pedir(ruta, opciones) {
  let res;
  try {
    res = await fetch(`${BASE}${ruta}`, opciones);
  } catch {
    throw new ErrorApi(0, { mensaje: 'No se pudo conectar con el servidor. ¿Está corriendo el backend?' });
  }
  const cuerpo = await res.json().catch(() => null);
  if (!res.ok) throw new ErrorApi(res.status, cuerpo);
  return cuerpo;
}

export const obtenerActividades = () => pedir('/actividades');

export const obtenerDisponibilidad = (actividadId, fecha) =>
  pedir(`/actividades/${encodeURIComponent(actividadId)}/disponibilidad?fecha=${encodeURIComponent(fecha)}`);

export const crearInscripcion = (datos) =>
  pedir('/inscripciones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });

export const obtenerActividad = (actividadId) => pedir(`/actividades/${encodeURIComponent(actividadId)}`);

export const obtenerInscripcion = (codigo) => pedir(`/inscripciones/${encodeURIComponent(codigo)}`);

export const listarInscripciones = ({ actividadId, fecha } = {}) => {
  const params = new URLSearchParams();
  if (actividadId) params.set('actividadId', actividadId);
  if (fecha) params.set('fecha', fecha);
  const query = params.toString();
  return pedir(`/inscripciones${query ? `?${query}` : ''}`);
};
