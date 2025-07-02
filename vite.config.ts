import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // keep your existing public API proxy
      '/api/public': {
        target: 'http://localhost:8086',
        changeOrigin: true,
      },
      // add this to proxy your worker endpoints
      '/api/worker': {
        target: 'http://localhost:8086',
        changeOrigin: true,
      },
      '/api/supplier':{
        target: 'http://localhost:8086',
        changeOrigin: true,
      },
      '/api/product':{
        target: 'http://localhost:8086',
        changeOrigin: true,
      }
    },
  },
})