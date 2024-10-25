import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vitest-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './test/coverage/unit',
      exclude: ['node_modules', 'test'],
      reporter: ['text', 'json-summary', 'json', 'html'],
      reportOnFailure: true,
      include: ['src/domain/**/application/use-cases/*.ts'],
      thresholds: {
        lines: 60,
        branches: 60,
        functions: 60,
        statements: 60,
      },
    },
  },
  plugins: [tsconfigPaths()],
});
