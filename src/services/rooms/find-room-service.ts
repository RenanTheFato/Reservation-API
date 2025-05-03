import { RoomStatus } from "@prisma/client";
import { prisma } from "../../config/prisma";
import { Room } from "../../interfaces/room-interface";
import { logger } from "../../utils/logger";

export class FindRoomService {
  async execute({ status }: Pick<Room, 'status'>) {

    try {
      let roomStatus: RoomStatus | undefined

      if (status) {
        if (Object.values(RoomStatus).includes(status as RoomStatus)) {
          roomStatus = status as RoomStatus
        }
      }

      const roomsFinded = await prisma.rooms.findMany({
        where: {
          status: roomStatus
        }
      })

      return roomsFinded
    } catch (error) {
      logger.error(`Error on find room(s) on the database: ${error}`)
      throw new Error(`Error on find room(s) on the database: ${error}`)
    }
  }
}