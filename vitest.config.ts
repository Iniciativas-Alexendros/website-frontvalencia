import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx', 'apps/web/tests/**/*.test.ts'],
    environment: 'node',
    coverage: {
      enabled: false,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: 'coverage',
      include: ['apps/web/src/**/*.ts', 'apps/web/src/**/*.tsx'],
      thresholds: {
        functions: 0,
        lines: 0,
        branches: 0,
      },
    },
  },
})
