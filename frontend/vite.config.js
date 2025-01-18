import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500, // Set the limit to 1000 KiB
  },
  server:{
    port:3000,
    proxy:{
      '/api':{
        target:'http://localhost:5000',
      }
    }
  },
})
