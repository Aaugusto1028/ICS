/**
 * Reglas de apertura del parque.
 * - Abre de 09:00 a 18:00.
 * - Cierra los lunes (día de mantenimiento).
 * - Cierra el 25/12 y el 01/01.
 */

const HORA_APERTURA = '09:00';
const HORA_CIERRE = '18:00';
const DIAS_CERRADO = [1]; // 0 = domingo, 1 = lunes, ...
const FERIADOS_CERRADO = ['12-25', '01-01']; // MM-DD

const REGEX_FECHA = /^\d{4}-\d{2}-\d{2}$/;
const REGEX_HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Convierte 'YYYY-MM-DD' en Date local (00:00). Devuelve null si es inválida. */
function parsearFecha(fecha) {
  if (typeof fecha !== 'string' || !REGEX_FECHA.test(fecha)) return null;
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const d = new Date(anio, mes - 1, dia);
  if (d.getFullYear() !== anio || d.getMonth() !== mes - 1 || d.getDate() !== dia) return null;
  return d;
}

function esHoraValida(hora) {
  return typeof hora === 'string' && REGEX_HORA.test(hora);
}

function aMinutos(hora) {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

/** Fecha local en formato YYYY-MM-DD. */
function formatearFecha(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
}

function parqueAbiertoEnFecha(fecha) {
  const d = parsearFecha(fecha);
  if (!d) return false;
  if (DIAS_CERRADO.includes(d.getDay())) return false;
  return !FERIADOS_CERRADO.includes(fecha.slice(5));
}

function parqueAbiertoEnHora(hora) {
  if (!esHoraValida(hora)) return false;
  const m = aMinutos(hora);
  return m >= aMinutos(HORA_APERTURA) && m < aMinutos(HORA_CIERRE);
}

module.exports = {
  HORA_APERTURA,
  HORA_CIERRE,
  parsearFecha,
  esHoraValida,
  aMinutos,
  formatearFecha,
  parqueAbiertoEnFecha,
  parqueAbiertoEnHora,
};
