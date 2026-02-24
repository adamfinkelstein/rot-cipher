import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'rot-cipher' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/rot-cipher/',
})
