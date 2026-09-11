import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vercel Sandbox runs the dev server on a fresh sb-*.vercel.run host each
  // time; the leading dot admits every one of them. Only the dev/preview
  // servers check hosts — the production build is static files.
  server: { allowedHosts: ['.vercel.run'] },
})
