import { z } from "zod";

// Define schema for required environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  PORT: z.string().regex(/^\d+$/).transform(Number),

  // Database & Secrets
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(20, "JWT_SECRET must be at least 20 chars"),

  // Mail settings
  MAIL_USER: z.string().email(),
  MAIL_PASS: z.string().min(1, "MAIL_PASS cannot be empty"),
  MAIL_SERVICE: z.string().min(1),
  MAIL_HOST: z.string().min(1),

  // OTP
  MIN_OTP: z.string().regex(/^\d+$/).transform(Number),
  MAX_OTP: z.string().regex(/^\d+$/).transform(Number),

  // Core expiration values
  VERIFY_EMAIL_OTP_EXPIRATION_MINUTES: z
    .string()
    .regex(/^\d+$/)
    .transform(Number),
  REFRESH_TOKEN_EXPIRES_IN_DAYS: z.string().regex(/^\d+$/).transform(Number),
  ACCSESS_TOKEN_EXPIRES_IN_MINUTES: z.string().regex(/^\d+$/).transform(Number),

  // Paths
  WEB_CLIENT_PATH: z.string().min(1),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.url(),
  FACEBOOK_APP_ID: z.string().min(1),
  FACEBOOK_SECRET: z.string().min(1),
  FACEBOOK_REDIRECT_URI: z.url(),
  FRONTEND_SOCIAL_REDIRECT: z.url(),
});

// Parse and validate process.env
export const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error.format());
  process.exit(1);
}

export const config = env.data;
