import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/public': {
        target: 'http://localhost:8086',
        changeOrigin: true,
      },
      // Proxy otras rutas de API si es necesario
    },
  },


})
