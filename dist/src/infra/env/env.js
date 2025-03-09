"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']),
    DATABASE_URL: zod_1.z.string().url(),
    PORT: zod_1.z.coerce.number(),
    JWT_PRIVATE_KEY: zod_1.z.string(),
    JWT_PUBLIC_KEY: zod_1.z.string(),
    CLOUDFLARE_ACCOUNT_ID: zod_1.z.string(),
    AWS_BUCKET_NAME: zod_1.z.string(),
    AWS_ACCESS_KEY_ID: zod_1.z.string(),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string(),
    AWS_DOMAIN_ATTACHMENT: zod_1.z.string(),
    SMTP_HOST: zod_1.z.string(),
    SMTP_PORT: zod_1.z.coerce.number(),
    SMTP_USER: zod_1.z.string(),
    SMTP_PASS: zod_1.z.string(),
});
//# sourceMappingURL=env.js.map