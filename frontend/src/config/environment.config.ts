import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_NODE_ENV: z
    .enum(["development", "production"])
    .default("development"),
  NEXT_PUBLIC_API_URL: z.string().default("http://localhost:8080"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

const env = _env.data;
const isProduction = env.NEXT_PUBLIC_NODE_ENV === "production";

export { env, isProduction };
