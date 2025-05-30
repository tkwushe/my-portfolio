import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
      '/projects': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      }
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      '@': resolve(__dirname, 'src')
    },
  },
  optimizeDeps: {
    include: ['buffer', 'react', 'react-dom', 'react-icons'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})