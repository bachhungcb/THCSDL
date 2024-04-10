import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/animes": "http://localhost:8080/animes",
    },
  },
  plugins: [react()],
})
