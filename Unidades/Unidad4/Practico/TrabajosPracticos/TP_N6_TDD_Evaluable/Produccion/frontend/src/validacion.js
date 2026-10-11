/**
 * Validación del lado del cliente. Replica las reglas del backend para dar
 * feedback inmediato; el backend sigue siendo quien decide (nunca se confía solo en el front).
 * Devuelve un objeto { campo: mensaje } con las mismas claves que usa la API.
 */

export const MAX_PERSONAS = 10;
const REGEX_DNI = /^\d{7,8}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function participanteVacio() {
  return { nombre: '', dni: '', edad: '', talla: '' };
}

/** Ajusta la lista de participantes a la cantidad indicada conservando lo ya cargado. */
export function ajustarParticipantes(participantes, cantidad) {
  const lista = participantes.slice(0, cantidad);
  while (lista.length < cantidad) lista.push(participanteVacio());
  return lista;
}

export function validarFormulario(form, actividad) {
  const errores = {};

  if (!actividad) errores.actividadId = 'Elegí una actividad.';
  if (!form.fecha) errores.fecha = 'Elegí una fecha.';
  if (!form.horario) errores.horario = 'Elegí un horario disponible.';

  const cantidad = Number(form.cantidadPersonas);
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > MAX_PERSONAS) {
    errores.cantidadPersonas = `Indicá entre 1 y ${MAX_PERSONAS} personas.`;
  }

  const dnis = new Set();
  form.participantes.forEach((p, i) => {
    const c = (campo) => `participantes[${i}].${campo}`;
    if (p.nombre.trim().length < 2) errores[c('nombre')] = 'Ingresá el nombre.';

    const dni = String(p.dni).trim();
    if (!REGEX_DNI.test(dni)) errores[c('dni')] = '7 u 8 números, sin puntos.';
    else if (dnis.has(dni)) errores[c('dni')] = 'DNI repetido.';
    else dnis.add(dni);

    const edad = Number(p.edad);
    if (p.edad === '' || !Number.isInteger(edad) || edad < 0 || edad > 120) {
      errores[c('edad')] = 'Edad inválida.';
    }
    if (actividad?.requiereTalla && !actividad.tallas.includes(p.talla)) {
      errores[c('talla')] = 'Elegí la talla.';
    }
  });

  if (!form.aceptaTerminos) errores.aceptaTerminos = 'Tenés que aceptar los términos y condiciones.';
  if (!REGEX_EMAIL.test(form.email.trim())) errores.email = 'Ingresá un email válido.';

  return errores;
}

/** Arma el cuerpo que espera POST /api/inscripciones. */
export function armarSolicitud(form, actividad) {
  return {
    actividadId: form.actividadId,
    fecha: form.fecha,
    horario: form.horario,
    cantidadPersonas: Number(form.cantidadPersonas),
    participantes: form.participantes.map((p) => ({
      nombre: p.nombre.trim(),
      dni: String(p.dni).trim(),
      edad: Number(p.edad),
      ...(actividad?.requiereTalla ? { talla: p.talla } : {}),
    })),
    aceptaTerminos: form.aceptaTerminos,
    email: form.email.trim(),
  };
}

/** Fecha de hoy en hora local, formato AAAA-MM-DD (para el min del input date). */
export function hoyISO(ahora = new Date()) {
  const mm = String(ahora.getMonth() + 1).padStart(2, '0');
  const dd = String(ahora.getDate()).padStart(2, '0');
  return `${ahora.getFullYear()}-${mm}-${dd}`;
}
