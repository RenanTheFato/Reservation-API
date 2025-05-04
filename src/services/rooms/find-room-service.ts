import { prisma } from "../../config/prisma";
import { Room } from "../../interfaces/room-interface";
import { logger } from "../../utils/logger";

export class FindRoomService {
  async execute({ status, name, location }: Partial<Pick<Room, 'status' | 'name' | 'location'>>) {
    const roomsFinded = await prisma.rooms.findMany({
      where: {
        status: status,
        ...(name && {
          name: {
            contains: name, mode: "insensitive",
          }
        }),
        ...(location && {
          location: {
            contains: location, mode: "insensitive",
          },
        }),
      },
    })

    if (roomsFinded.length === 0) {
      logger.warn("Room(s) not found")
      throw new Error("Room(s) not found")
    }

    return roomsFinded
  }
}