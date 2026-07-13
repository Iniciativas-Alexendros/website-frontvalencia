import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['../../../tests/unit/**/*.test.ts', '../../../tests/unit/**/*.test.tsx', 'tests/**/*.test.ts'],
    environment: 'node',
    coverage: {
      enabled: false,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '../../../coverage',
    },
  },
})
