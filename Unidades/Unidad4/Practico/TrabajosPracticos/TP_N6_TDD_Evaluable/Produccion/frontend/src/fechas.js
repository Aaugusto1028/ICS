/** '2026-10-17' -> 'Sábado, 17 de octubre de 2026' */
export function formatearFechaLarga(iso, { conAnio = false } = {}) {
  if (!iso) return '';
  const [a, m, d] = iso.split('-').map(Number);
  const texto = new Date(a, m - 1, d).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    ...(conAnio ? { year: 'numeric' } : {}),
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
