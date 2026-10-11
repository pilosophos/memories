import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/memories',
  plugins: [
    preact(),
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      input: {
        main: 'index.html',
        projector: 'projector.html'
      }
    }
  }
})
