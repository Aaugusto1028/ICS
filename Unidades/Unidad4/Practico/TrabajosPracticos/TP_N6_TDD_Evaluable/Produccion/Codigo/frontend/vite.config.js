import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Accesible desde otros dispositivos de la red (para abrir el link del QR desde el celular)
    host: true,
    // Todo lo que empiece con /api se redirige al backend: evita problemas de CORS en desarrollo.
    proxy: { '/api': 'http://localhost:3001' },
  },
  test: { environment: 'node' },
});
