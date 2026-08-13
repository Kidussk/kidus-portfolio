import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        // Recharts is shared by several demos — keep it in one cacheable chunk
        // instead of duplicating it into each demo bundle.
        manualChunks(id) {
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-'))
            return 'charts'
          if (id.includes('node_modules/react-router')) return 'router'
        },
      },
    },
  },
})
