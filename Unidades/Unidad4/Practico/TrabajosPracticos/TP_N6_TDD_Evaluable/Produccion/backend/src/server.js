const config = require('./config');
const { crearApp } = require('./app');
const { InscripcionService } = require('./services/inscripcionService');
const { MailService, crearTransporter } = require('./services/mailService');
const { RepositorioSQLite } = require('./repositories/repositorioSQLite');

async function iniciar() {
  const repositorio = await RepositorioSQLite.crear({ archivo: config.archivoBase });
  console.log(`[base] SQLite en ${config.archivoBase} (${repositorio.listar().length} inscripciones guardadas)`);

  const { transporter, modo, remitente, descripcion } = crearTransporter();
  const mailer = new MailService({ transporter, modo, remitente });
  console.log(`[mail] Envío por ${descripcion}`);
  if (modo === 'archivo') {
    console.log('[mail] Para enviar mails reales, completá SMTP_* en backend/.env (ver .env.example).');
  } else {
    mailer
      .verificar()
      .then(() => console.log('[mail] Conexión SMTP verificada: usuario y contraseña correctos.'))
      .catch((e) => console.error(`[mail] ERROR al conectar con SMTP: ${e.message}`));
  }

  const inscripcionService = new InscripcionService({ repositorio, mailer, urlPublica: config.urlPublica });
  if (config.urlPublica) console.log(`[qr] Los QR incluyen el link ${config.urlPublica}/inscripcion/<código>`);

  crearApp({ inscripcionService }).listen(config.puerto, () => {
    console.log(`API de inscripciones escuchando en http://localhost:${config.puerto}`);
  });
}

iniciar().catch((e) => {
  console.error('No se pudo iniciar el servidor:', e);
  process.exit(1);
});
