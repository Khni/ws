import { Redis, RedisOptions } from "ioredis";

type CreateRedisClientOptions = {
  url?: string;
  options?: RedisOptions;
};

export function createRedisClient({
  url = "redis://localhost:6379",
  options = {},
}: CreateRedisClientOptions = {}) {
  const redis = new Redis(url, {
    maxRetriesPerRequest: 3,
    connectTimeout: 10000,
    retryStrategy(times) {
      return Math.min(times * 200, 2000);
    },
    ...options,
  });

  redis.on("connect", () => console.log("✅ Redis connected"));
  redis.on("error", (err) => console.error("❌ Redis error:", err));

  return redis;
}

// Default client instance (using defaults)
export const redisClient = createRedisClient();

export default redisClient;
