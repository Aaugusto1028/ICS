const path = require('path');

// Carga las variables del archivo backend/.env (si existe)
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

module.exports = {
  puerto: Number(process.env.PORT || 3001),
  archivoBase: path.resolve(__dirname, '..', process.env.DB_ARCHIVO || 'data/parque.sqlite'),
  urlPublica: process.env.URL_PUBLICA || null,
};
