import { Redis } from "ioredis";
import { ICache } from "./ICache.js";

export class RedisCache implements ICache {
  private readonly client: Redis;

  constructor(redisClient: Redis) {
    this.client = redisClient;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`[RedisCache] Error getting key "${key}":`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttlSeconds && ttlSeconds > 0) {
        await this.client.set(key, serialized, "EX", ttlSeconds);
      } else {
        await this.client.set(key, serialized);
      }
    } catch (error) {
      console.error(`[RedisCache] Error setting key "${key}":`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`[RedisCache] Error deleting key "${key}":`, error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const exists = await this.client.exists(key);
      return exists === 1;
    } catch (error) {
      console.error(
        `[RedisCache] Error checking existence of "${key}":`,
        error
      );
      return false;
    }
  }

  async flushAll(): Promise<void> {
    try {
      await this.client.flushall();
      console.log("🧹 Redis cache cleared");
    } catch (error) {
      console.error(`[RedisCache] Error flushing cache:`, error);
    }
  }
}
