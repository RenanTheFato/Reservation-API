import { prisma } from "../../../config/prisma";
import { Room } from "../../../interfaces/room-interface";

export class PatchRoomService{
  async execute({ id, name, description, location, status}: Partial<Pick<Room, 'id' | 'name' | 'description' | 'location' | 'status'>>){
    
    if (name) {
      const isRoomNameAlreadyExists = await prisma.rooms.count({
        where: {
          name,
        },
      })
      if (isRoomNameAlreadyExists) {
        throw new Error("Unable to proceed with the pacth operation. The room name already exists.")
      }
    }

    const patchedRoom = await prisma.rooms.update({
      where: {
        id,
      },
      data:{
        name,
        description,
        location,
        status,
      },
    })

    return patchedRoom
  }
}