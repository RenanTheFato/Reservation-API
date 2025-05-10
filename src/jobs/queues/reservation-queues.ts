import { Queue } from 'bullmq';
import { redis } from "../../config/redis";

export const reservationQueue = new Queue('reservationQueue', {
  connection: redis,
  defaultJobOptions: {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  },
})