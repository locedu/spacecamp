import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from external sources during development
    port: 5173, // Ensure the correct port is used
  },
  preview: {
    allowedHosts: ["spacebar-react.onrender.com"], // ✅ Add your Render domain here
  },
})
