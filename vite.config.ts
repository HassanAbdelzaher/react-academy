import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this as a project site under /react-academy/; every other
  // target (dev, Vercel) stays at the root.
  base: process.env.GITHUB_PAGES === 'true' ? '/react-academy/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    // Content and pure-logic suites need no DOM; the files that do opt in with
    // an `@vitest-environment jsdom` docblock.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
