"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
const vitest_tsconfig_paths_1 = require("vitest-tsconfig-paths");
exports.default = (0, config_1.defineConfig)({
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
    plugins: [(0, vitest_tsconfig_paths_1.default)()],
});
//# sourceMappingURL=vitest.config.js.map