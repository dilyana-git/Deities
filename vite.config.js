import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vercel Sandbox runs the dev server on a fresh sb-*.vercel.run host each
  // time; the leading dot admits every one of them. Only the dev/preview
  // servers check hosts — the production build is static files.
  server: { allowedHosts: ['.vercel.run'] },
  build: {
    /* Split the heavy, rarely-changing dependencies into their own chunks: d3
       (the graph engine) and react dominate the bundle, so isolating them keeps
       the app-code chunk small and lets a browser keep the vendor code across
       deploys where only app code changed — which is most of them, and which
       vercel.json now caches for a year. The three full-screen overlays are
       code-split separately, via React.lazy in App.jsx. */
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        /* By id, not by package name: naming 'd3' alone catches only the
           umbrella entry point — the graph's actual code lives in the d3-*
           sub-packages (d3-force, d3-selection, d3-zoom…), which would stay
           behind in the app chunk and be re-downloaded on every deploy. */
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          if (/[\\/]node_modules[\\/]d3(-[a-z0-9-]+)?[\\/]/.test(id)) return 'd3'
        },
      },
    },
  },
})
