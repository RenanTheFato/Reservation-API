import { prisma } from "../../../config/prisma";
import { Room } from "../../../interfaces/room-interface";

export class CreateRoomService {
  async execute({ name, description, location }: Pick<Room, 'name' | 'description' | 'location'>) {

    const isRoomNameAlreadyExists = await prisma.rooms.count({
      where: {
        name,
      },
    })

    if (isRoomNameAlreadyExists) {
      throw new Error("Room name already exists.")
    }

    const room = await prisma.rooms.create({
      data: {
        name,
        description,
        location,
      },
    })

    return room
  }
}