import { Worker } from 'bullmq';
import { redis } from '../../config/redis';
import { releaseProcessor } from '../processors/release-room-processor';

export const reservationWorker = new Worker('reservationQueue', releaseProcessor, {
    connection: redis,
  }
)
