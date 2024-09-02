import { defineConfig } from "vitest/config";
import tsconfigPaths from "vitest-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [tsconfigPaths()],
});
