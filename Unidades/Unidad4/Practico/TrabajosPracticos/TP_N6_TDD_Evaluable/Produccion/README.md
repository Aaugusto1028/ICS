# Inscripción a actividades — EcoHarmony Park

Aplicación web para consultar actividades y horarios, registrar inscripciones de participantes y obtener un código QR de confirmación. Está compuesta por una interfaz web y una API REST.

## Estructura

```text
Produccion/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Rutas y manejo de errores de la API
│   │   ├── server.js              # Inicio del servidor
│   │   ├── config.js              # Puerto, base de datos y URL pública
│   │   ├── domain/                # Reglas y entidades del negocio
│   │   ├── repositories/          # Persistencia SQLite mediante sql.js
│   │   └── services/              # Inscripciones, correo y otras operaciones
│   ├── tests/                     # Pruebas automatizadas con Jest
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── paginas/               # Pantallas de la aplicación
│   │   ├── api.js                 # Comunicación con el backend
│   │   ├── App.jsx                # Rutas de la interfaz
│   │   └── styles.css             # Estilos
│   ├── package.json
│   └── vite.config.js             # Servidor de desarrollo y proxy de /api
├── DECISIONES_DE_DISENO.md        # Reglas y decisiones del producto
└── README.md
```

La base de datos se crea automáticamente en `backend/data/parque.sqlite` al iniciar el servidor. Usa `sql.js`, por lo que no hace falta instalar un motor SQLite por separado.

## Requisitos

- Node.js 18 o superior y npm.
- macOS, Windows o Linux.

## Ejecutar localmente

Hay que ejecutar el backend y el frontend en **dos terminales separadas**. Abrí una terminal en la carpeta `Produccion`.

### 1. Backend

```sh
cd backend
npm install
npm run dev
```

La API queda escuchando en <http://localhost:3001>. Para comprobarla, abrí <http://localhost:3001/api/salud>; debería responder `{"ok":true}`.

### 2. Frontend

En una segunda terminal, desde la carpeta `Produccion`:

```sh
cd frontend
npm install
npm run dev
```

Abrí <http://localhost:5173> en el navegador. En desarrollo, Vite reenvía las solicitudes `/api` al backend en `localhost:3001`; por eso ambos procesos deben estar activos.

Para detenerlos, presioná `Ctrl+C` en cada terminal.

## Correo electrónico

No hace falta configurar SMTP para probar la aplicación. Sin configuración SMTP, el backend guarda los correos de confirmación como archivos `.eml` en `backend/outbox/` y la inscripción igualmente queda registrada.

Para enviar correos reales, configurá las variables SMTP en `backend/.env` antes de iniciar el backend. El código lee ese archivo si existe; las variables relevantes son `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` y, opcionalmente, `MAIL_FROM`. **No guardes credenciales reales en el repositorio.**

## Pruebas y compilación

Cada parte tiene dependencias y pruebas propias. Ejecutá los comandos desde su respectiva carpeta:

```sh
# Backend (Jest)
cd backend
npm test
```

```sh
# Frontend (Vitest)
cd frontend
npm test
```

Para generar la compilación de producción del frontend:

```sh
cd frontend
npm run build
```

## Configuración opcional del backend

El backend admite estas variables de entorno:

- `PORT`: puerto de la API; por defecto `3001`.
- `DB_ARCHIVO`: ruta de la base SQLite; por defecto `data/parque.sqlite` relativa a `backend/`.
- `URL_PUBLICA`: URL pública opcional que se agrega a los QR.

Más detalles sobre las reglas del producto y decisiones de implementación: [DECISIONES_DE_DISENO.md](./DECISIONES_DE_DISENO.md).
