import { prisma } from "../../../config/prisma";
import { Room } from "../../../interfaces/room-interface";

export class DeleteRoomService {
  async execute({ id }: Pick<Room, 'id'>) {

    const isRoomExists = await prisma.rooms.findUnique({
      where: {
        id,
      },
    })

    if (!isRoomExists) {
      throw new Error("Room doesn't exists")
    }

    await prisma.rooms.delete({
      where: {
        id,
      },
    })

  }
}