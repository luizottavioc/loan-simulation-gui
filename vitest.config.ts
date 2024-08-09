import { coverageConfigDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['html'],
      reportsDirectory: './tests/unit/coverage',
      exclude: coverageConfigDefaults.exclude,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Ajuste o caminho conforme necessário
    },
  },
})
