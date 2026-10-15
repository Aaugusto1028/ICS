const QRCode = require('qrcode');

/*
 * Opciones únicas para dibujar el QR (pantalla y email), pensadas para que lo lea
 * la cámara de cualquier celular:
 * - margin 4: el borde blanco ("zona de silencio") que pide el estándar QR. Con menos,
 *   muchas cámaras no lo detectan.
 * - errorCorrectionLevel 'L': menos redundancia = menos cuadraditos = más fácil de leer
 *   desde una pantalla (que no se ensucia ni se raya como un papel).
 * - Tamaño según el contenido: cada cuadradito se muestra de 4 px. Así un grupo grande
 *   (más texto, más cuadraditos) da un QR más grande en vez de cuadraditos más chicos,
 *   que es lo que hace que la cámara no lo lea.
 */
const PX_POR_MODULO = 4;
const OPCIONES_QR = {
  errorCorrectionLevel: 'L',
  margin: 4,
  color: { dark: '#1F3326', light: '#FFFFFF' },
};

/** Ancho en px con el que hay que mostrar el QR de ese texto (incluye el borde blanco). */
function anchoQR(texto) {
  const { modules } = QRCode.create(texto, OPCIONES_QR);
  return (modules.size + OPCIONES_QR.margin * 2) * PX_POR_MODULO;
}

/** Para la pantalla: PNG en data URL, ya del tamaño en que se muestra. */
const qrComoDataUrl = (texto) => QRCode.toDataURL(texto, { ...OPCIONES_QR, scale: PX_POR_MODULO });

/** Para el mail: PNG al doble de resolución (se ve nítido en pantallas de celular). */
const qrComoPng = (texto) => QRCode.toBuffer(texto, { ...OPCIONES_QR, scale: PX_POR_MODULO * 2 });

module.exports = { OPCIONES_QR, anchoQR, qrComoDataUrl, qrComoPng };
