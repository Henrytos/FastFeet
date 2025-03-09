"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unplugin_swc_1 = require("unplugin-swc");
const config_1 = require("vitest/config");
const vitest_tsconfig_paths_1 = require("vitest-tsconfig-paths");
exports.default = (0, config_1.defineConfig)({
    test: {
        include: ['src/infra/**/*.e2e-spec.ts'],
        globals: true,
        root: './',
        setupFiles: ['./test/setup-files-e2e.ts'],
    },
    plugins: [unplugin_swc_1.default.vite(), (0, vitest_tsconfig_paths_1.default)()],
});
//# sourceMappingURL=vitest.config.e2e.js.map