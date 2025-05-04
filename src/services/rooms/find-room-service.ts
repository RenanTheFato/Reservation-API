import { prisma } from "../../config/prisma";
import { Room } from "../../interfaces/room-interface";
import { logger } from "../../utils/logger";

export class FindRoomService {
  async execute({ status }: Pick<Room, 'status'>) {
    const roomsFinded = await prisma.rooms.findMany({
      where: {
        status: status
      }
    })

    console.log(roomsFinded)

    if (roomsFinded.length === 0) {
      logger.warn("Room(s) not found")
      throw new Error("Room(s) not found")
    }

    return roomsFinded
  }
}