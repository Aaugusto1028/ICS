/**
 * Envía un mail de prueba con una inscripción de ejemplo, para verificar la configuración SMTP.
 * Uso:  npm run probar-mail -- tu-correo@gmail.com
 */
require('./config');
const { MailService, crearTransporter } = require('./services/mailService');
const { buscarActividad } = require('./domain/actividades');

async function main() {
  const destino = process.argv[2];
  if (!destino) {
    console.log('Uso: npm run probar-mail -- tu-correo@ejemplo.com');
    process.exit(1);
  }

  const { transporter, modo, remitente, descripcion } = crearTransporter();
  console.log(`Enviando por ${descripcion} a ${destino}...`);
  const mailer = new MailService({ transporter, modo, remitente });
  await mailer.verificar();

  const inscripcion = {
    codigo: 'INS-PRUEBA',
    fecha: '2026-10-17',
    horario: '10:00',
    cantidadPersonas: 1,
    email: destino,
    participantes: [{ nombre: 'Visitante de Prueba', dni: '40123456', edad: 25, talla: 'M' }],
    contenidoQR:
      'ECOHARMONY PARK INS-PRUEBA\nTirolesa Sabado 17/10/2026 10:00 hs\n1. Visitante de Prueba DNI 40123456',
  };
  const r = await mailer.enviarConfirmacion({ inscripcion, actividad: buscarActividad('tirolesa') });
  console.log(modo === 'smtp' ? `Listo, mail enviado (id ${r.messageId}). Revisá la bandeja de entrada y el spam.` : 'Sin SMTP configurado: se guardó en backend/outbox/.');
}

main().catch((e) => {
  console.error(`No se pudo enviar: ${e.message}`);
  if (/Invalid login|Username and Password not accepted|535/i.test(e.message)) {
    console.error('Revisá SMTP_USER y SMTP_PASS. En Gmail tenés que usar una "contraseña de aplicación", no tu contraseña normal.');
  }
  process.exit(1);
});
