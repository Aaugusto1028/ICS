const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { qrComoPng, anchoQR } = require('../qr');
const { parsearFecha } = require('../domain/parque');

const CID_QR = 'qr-inscripcion';
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fechaLegible(fecha) {
  const d = parsearFecha(fecha);
  if (!d) return fecha;
  const [a, m, dia] = fecha.split('-');
  return `${DIAS[d.getDay()]} ${dia}/${m}/${a}`;
}

const celda = 'padding:8px 10px;border-bottom:1px solid rgb(220,233,188)';

function armarHtml(inscripcion, actividad, urlDetalle) {
  const filas = inscripcion.participantes
    .map(
      (p) => `<tr>
        <td style="${celda}">${escapar(p.nombre)}</td>
        <td style="${celda}">${escapar(p.dni)}</td>
        <td style="${celda}">${escapar(p.edad)}</td>
        ${actividad.requiereTalla ? `<td style="${celda}">${escapar(p.talla)}</td>` : ''}
      </tr>`
    )
    .join('');

  const boton = urlDetalle
    ? `<p style="text-align:center;margin:22px 0 4px">
         <a href="${escapar(urlDetalle)}" style="display:inline-block;background:rgb(56,102,65);color:rgb(255,255,255);text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px">Ver mi inscripción</a>
       </p>`
    : '';

  return `<!doctype html>
<html><body style="margin:0;background:rgb(249,245,234);font-family:Lato,Arial,Helvetica,sans-serif;color:rgb(31,51,38)">
  <div style="max-width:560px;margin:24px auto;background:rgb(255,255,255);border-radius:14px;overflow:hidden;border:1px solid rgb(220,233,188)">
    <div style="background:rgb(56,102,65);color:rgb(255,255,255);padding:20px 24px">
      <div style="font-size:13px;opacity:.85">EcoHarmony Park · Confirmación de inscripción</div>
      <div style="font-size:24px;font-weight:bold;margin-top:2px">${escapar(actividad.nombre)}</div>
    </div>
    <div style="padding:24px">
      <p style="margin-top:0">¡Listo! Tu lugar está reservado. Presentá este código QR junto con el DNI de cada participante al ingresar a la actividad.</p>
      <div style="text-align:center;margin:20px 0">
        <img src="cid:${CID_QR}" width="${anchoQR(inscripcion.contenidoQR)}" alt="Código QR de la inscripción" style="display:block;margin:0 auto;width:${anchoQR(inscripcion.contenidoQR)}px;max-width:100%;height:auto;border-radius:12px" />
        <div style="font-family:Consolas,monospace;font-size:18px;letter-spacing:2px;margin-top:8px;font-weight:bold">${escapar(inscripcion.codigo)}</div>
        <div style="font-size:12px;color:rgb(84,104,88)">Escaneá el QR con la cámara del celular o con Google Lens</div>
      </div>
      <table style="width:100%;font-size:15px;margin-bottom:18px;border-collapse:collapse">
        <tr><td style="${celda};color:rgb(84,104,88)">Fecha</td><td style="${celda}"><b>${escapar(fechaLegible(inscripcion.fecha))}</b></td></tr>
        <tr><td style="${celda};color:rgb(84,104,88)">Horario</td><td style="${celda}"><b>${escapar(inscripcion.horario)} hs</b></td></tr>
        <tr><td style="${celda};color:rgb(84,104,88)">Personas</td><td style="${celda}"><b>${escapar(inscripcion.cantidadPersonas)}</b></td></tr>
      </table>
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        <tr style="background:rgb(237,244,221);text-align:left">
          <th style="padding:8px 10px">Nombre</th><th style="padding:8px 10px">DNI</th><th style="padding:8px 10px">Edad</th>
          ${actividad.requiereTalla ? '<th style="padding:8px 10px">Talla</th>' : ''}
        </tr>
        ${filas}
      </table>
      ${boton}
      <p style="font-size:12px;color:rgb(84,104,88);margin-top:22px">Aceptaste los términos y condiciones de ${escapar(actividad.nombre)} y las condiciones generales del parque. Presentate 15 minutos antes del horario.</p>
    </div>
  </div>
</body></html>`;
}

class MailService {
  /**
   * @param {object} deps
   * @param {{sendMail: Function, verify?: Function}} deps.transporter transporte de nodemailer (o un falso en tests)
   * @param {'smtp'|'archivo'} [deps.modo]
   * @param {string} [deps.remitente]
   */
  constructor({ transporter, modo = 'smtp', remitente }) {
    this.transporter = transporter;
    this.modo = modo;
    this.remitente = remitente || 'EcoHarmony Park <inscripciones@ecoharmonypark.local>';
  }

  /** Comprueba usuario y contraseña contra el servidor SMTP (al arrancar). */
  async verificar() {
    if (this.modo !== 'smtp' || !this.transporter.verify) return true;
    await this.transporter.verify();
    return true;
  }

  async enviarConfirmacion({ inscripcion, actividad, urlDetalle = null }) {
    const qrPng = await qrComoPng(inscripcion.contenidoQR);

    const info = await this.transporter.sendMail({
      from: this.remitente,
      to: inscripcion.email,
      subject: `Inscripción confirmada: ${actividad.nombre} — ${fechaLegible(inscripcion.fecha)} ${inscripcion.horario} hs`,
      text:
        `Tu inscripción a ${actividad.nombre} quedó confirmada.\n\n` +
        inscripcion.contenidoQR +
        '\n\nPresentá el código QR adjunto junto con el DNI de cada participante.',
      html: armarHtml(inscripcion, actividad, urlDetalle),
      attachments: [{ filename: `${inscripcion.codigo}.png`, content: qrPng, cid: CID_QR, contentType: 'image/png' }],
    });

    return { modo: this.modo, messageId: info?.messageId };
  }
}

/**
 * Arma el transporte según las variables de entorno (archivo backend/.env):
 *  - Con SMTP_HOST: envía el mail de verdad por SMTP (por ejemplo, Gmail).
 *  - Sin SMTP_HOST: guarda cada mail como archivo .eml en backend/outbox/ (modo de prueba).
 */
function crearTransporter(env = process.env) {
  if (env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 587),
      secure: env.SMTP_SECURE === 'true',
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: (env.SMTP_PASS || '').replace(/\s+/g, '') } : undefined,
    });
    const remitente = env.MAIL_FROM || (env.SMTP_USER ? `EcoHarmony Park <${env.SMTP_USER}>` : undefined);
    return { transporter, modo: 'smtp', remitente, descripcion: `SMTP ${env.SMTP_HOST} (${env.SMTP_USER || 'sin usuario'})` };
  }

  const outbox = path.resolve(__dirname, '..', '..', 'outbox');
  const stream = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'windows' });
  const transporter = {
    async sendMail(mensaje) {
      const info = await stream.sendMail(mensaje);
      fs.mkdirSync(outbox, { recursive: true });
      const nombre = mensaje.attachments?.[0]?.filename?.replace('.png', '') || String(Date.now());
      const archivo = path.join(outbox, `${nombre}.eml`);
      fs.writeFileSync(archivo, info.message);
      console.log(`[mail] Modo prueba: email guardado en ${archivo}`);
      return info;
    },
  };
  return { transporter, modo: 'archivo', remitente: env.MAIL_FROM, descripcion: `archivos .eml en ${outbox}` };
}

module.exports = { MailService, crearTransporter, CID_QR };
