import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vitest-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './test/coverage/unit',
      exclude: ['node_modules', 'test'],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
      include: ['src/domain/**/application/use-cases/*.ts'],
    },
  },
  plugins: [tsconfigPaths()],
});
