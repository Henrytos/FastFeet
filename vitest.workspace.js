import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vitest.config.ts",
  "./vitest.config.e2e.ts",
  "./dist/vitest.config.js",
  "./dist/vitest.config.e2e.js"
])
