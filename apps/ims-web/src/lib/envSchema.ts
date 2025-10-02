"use client";
import { z } from "zod";

// Define schema for required environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z
    .string()
    .min(1, "Google Client ID is required"),
  NEXT_PUBLIC_GOOGLE_REDIRECT_URI: z
    .string()
    .url("Google Redirect URI must be a valid URL"),
  NEXT_PUBLIC_FACEBOOK_APP_ID: z.string().min(1, "Facebook App ID is required"),
  NEXT_PUBLIC_FACEBOOK_REDIRECT_URI: z
    .string()
    .url("Facebook Redirect URI must be a valid URL"),
});

// Function that accepts env object (e.g. process.env)
export function loadConfig(envObj: NodeJS.ProcessEnv) {
  const parsed = envSchema.safeParse({
    NODE_ENV: envObj.NODE_ENV,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: envObj.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI: envObj.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    NEXT_PUBLIC_FACEBOOK_APP_ID: envObj.NEXT_PUBLIC_FACEBOOK_APP_ID,
    NEXT_PUBLIC_FACEBOOK_REDIRECT_URI: envObj.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI,
  });

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

// Example usage:
