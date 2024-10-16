import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number(),
  JWT_SECRET_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
