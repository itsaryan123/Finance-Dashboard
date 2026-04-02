import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-oxc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    strictPort: false,
    open: true
  },
  optimizeDeps: {
    rolldownOptions: {}
  },
  ssr: {
    optimizeDeps: {
      rolldownOptions: {}
    }
  }
})
