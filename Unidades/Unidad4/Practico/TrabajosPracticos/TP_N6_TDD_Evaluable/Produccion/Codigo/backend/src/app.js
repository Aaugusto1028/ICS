const express = require('express');
const cors = require('cors');
const { qrComoDataUrl } = require('./qr');
const { ErrorDominio } = require('./errors');

/**
 * Crea la app de Express. Recibe el servicio ya armado (inyección de dependencias)
 * para que los tests puedan usar un repositorio y un mailer falsos.
 */
function crearApp({ inscripcionService }) {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/salud', (_req, res) => res.json({ ok: true }));

  app.get('/api/actividades', (_req, res) => {
    res.json(inscripcionService.listarActividades());
  });

  app.get('/api/actividades/:id', (req, res) => {
    res.json(inscripcionService.obtenerActividad(req.params.id));
  });

  // Días que se pueden elegir (hoy y mañana), marcando los que el parque está cerrado
  app.get('/api/fechas', (_req, res) => {
    res.json(inscripcionService.fechasDisponibles());
  });

  app.get('/api/actividades/:id/disponibilidad', (req, res) => {
    res.json(inscripcionService.disponibilidad(req.params.id, req.query.fecha));
  });

  app.post('/api/inscripciones', async (req, res, next) => {
    try {
      const inscripcion = await inscripcionService.inscribir(req.body);
      const qr = await qrComoDataUrl(inscripcion.contenidoQR);
      res.status(201).json({ ...inscripcion, qr });
    } catch (e) {
      next(e);
    }
  });

  app.get('/api/inscripciones', (req, res) => {
    res.json(inscripcionService.listarInscripciones({ actividadId: req.query.actividadId, fecha: req.query.fecha }));
  });

  app.get('/api/inscripciones/:codigo', async (req, res, next) => {
    try {
      const inscripcion = inscripcionService.obtenerInscripcion(req.params.codigo);
      const qr = await qrComoDataUrl(inscripcion.contenidoQR);
      res.json({ ...inscripcion, qr });
    } catch (e) {
      next(e);
    }
  });

  // JSON mal formado
  app.use((err, _req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ codigo: 'JSON_INVALIDO', mensaje: 'El cuerpo de la petición no es un JSON válido.' });
    }
    return next(err);
  });

  // Errores de dominio -> código HTTP
  app.use((err, _req, res, _next) => {
    if (err instanceof ErrorDominio) {
      return res.status(err.status).json({ codigo: err.codigo, mensaje: err.message, detalles: err.detalles });
    }
    console.error(err);
    return res.status(500).json({ codigo: 'ERROR_INTERNO', mensaje: 'Ocurrió un error inesperado.' });
  });

  return app;
}

module.exports = { crearApp };
