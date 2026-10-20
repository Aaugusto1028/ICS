/**
 * Reglas de apertura del parque (definidas por el PO, FAQ 1, 11, 12, 23 y 30).
 * - El parque abre de 08:30 a 19:00.
 * - Las actividades tienen un turno por hora de 09:00 a 17:00 (a las 18:00 ya no hay turno).
 * - Cierra los lunes y el 25/12 y el 01/01.
 * - Un turno se puede reservar solo dentro de las 24 hs anteriores a su inicio
 *   y hasta 15 minutos antes de que empiece.
 */

const HORA_APERTURA = '08:30';
const HORA_CIERRE = '19:00';
const PRIMER_TURNO = '09:00';
const ULTIMO_TURNO = '17:00';
const HORAS_ANTICIPACION_MAXIMA = 24;
const MINUTOS_CIERRE_INSCRIPCION = 15;
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

/** Turnos de las actividades: uno por hora en punto, de PRIMER_TURNO a ULTIMO_TURNO. */
function turnosDelDia() {
  const turnos = [];
  for (let m = aMinutos(PRIMER_TURNO); m <= aMinutos(ULTIMO_TURNO); m += 60) {
    turnos.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
  }
  return turnos;
}

/** Date local del inicio de un turno ('2026-10-10', '10:00'). */
function inicioDelTurno(fecha, horario) {
  const d = parsearFecha(fecha);
  d.setMinutes(aMinutos(horario));
  return d;
}

/**
 * Estado de la ventana de inscripción de un turno respecto de `ahora`:
 * - 'abierta':     empieza dentro de las próximas 24 hs y faltan más de 15 minutos.
 * - 'cerrada':     ya empezó o faltan 15 minutos o menos.
 * - 'no_habilitada': faltan más de 24 hs.
 */
function estadoVentanaInscripcion(fecha, horario, ahora) {
  const minutosQueFaltan = (inicioDelTurno(fecha, horario) - ahora) / 60000;
  if (minutosQueFaltan <= MINUTOS_CIERRE_INSCRIPCION) return 'cerrada';
  if (minutosQueFaltan > HORAS_ANTICIPACION_MAXIMA * 60) return 'no_habilitada';
  return 'abierta';
}

/** Fechas que tocan la ventana de inscripción (hoy y mañana), con si el parque abre ese día. */
function fechasInscribibles(ahora) {
  const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  return [0, 1].map((dias) => {
    const d = new Date(hoy);
    d.setDate(d.getDate() + dias);
    const fecha = formatearFecha(d);
    return { fecha, parqueAbierto: parqueAbiertoEnFecha(fecha) };
  });
}

function parqueAbiertoEnHora(hora) {
  if (!esHoraValida(hora)) return false;
  const m = aMinutos(hora);
  return m >= aMinutos(HORA_APERTURA) && m < aMinutos(HORA_CIERRE);
}

module.exports = {
  HORA_APERTURA,
  HORA_CIERRE,
  HORAS_ANTICIPACION_MAXIMA,
  MINUTOS_CIERRE_INSCRIPCION,
  parsearFecha,
  esHoraValida,
  aMinutos,
  formatearFecha,
  parqueAbiertoEnFecha,
  parqueAbiertoEnHora,
  turnosDelDia,
  estadoVentanaInscripcion,
  fechasInscribibles,
};
