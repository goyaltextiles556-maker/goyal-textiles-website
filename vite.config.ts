
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Standard port for Vite dev server
    host: true, // Expose to network
    strictPort: false, // Allow port fallback if 5173 is busy
  },
})
