import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/components/**/*.test.tsx'],
    environment: 'node',
    environmentMatchGlobs: [
      ['tests/components/**', 'jsdom'],
    ],
  },
});
