import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(8080),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
  DB_DATABASE: z.string().default('english-workspace'),
  DB_SYNC: z.enum(['true', 'false']).default('false'),
  DB_LOGGING: z.enum(['true', 'false']).default('true'),
  API_PREFIX: z.string().default('api'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

const env = _env.data;
const isProduction = env.NODE_ENV === 'production';

export { env, isProduction };
