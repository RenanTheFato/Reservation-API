import { Job } from "bullmq";
import { logger } from "../../utils/logger";
import { prisma } from "../../config/prisma";

export const releaseProcessor = async (job: Job) => {
  const { roomId } = job.data

  logger.info(`Processing room release ${roomId}`)

  try {

    await prisma.reservation.deleteMany({
      where: {
        roomId,
      },
    })

    await prisma.rooms.update({
      where: {
        id: roomId,
      },
      data: {
        status: 'AVAILABLE',
      },
    })
    logger.success(`Room ${roomId} released successfully`)
    return { message: `Room released: ${roomId}`, }
  } catch (error) {
    logger.error(`Failed to release room ${roomId} due a an error: ${error}`)
    throw error
  }
}
