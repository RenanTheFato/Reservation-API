import { RedisOptions } from "ioredis";

export const redis: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
}