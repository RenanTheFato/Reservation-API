import { Reservation } from "@prisma/client";
import { prisma } from "../../config/prisma";

export class CreateReservationService {
  async execute({ userId, roomId, startTime, endTime }: Pick<Reservation, 'userId' | 'roomId' | 'startTime' | 'endTime'>) {

    const isRoomExists = await prisma.rooms.findUnique({
      where: {
        id: roomId,
      },
    })

    if (!isRoomExists) {
      throw new Error("Room not found")
    }

    const roomIsAlreadyInAOneReservativon = await prisma.reservation.findFirst({
      where: {
        roomId,
      },
    })

    if (roomIsAlreadyInAOneReservativon) {
      throw new Error("Room is already in a one reservation")
    }

    if(isRoomExists.status !== "AVAILABLE"){
      throw new Error(`Cannot can make the reservation. Cause: Room is ${isRoomExists.status}`)
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        roomId,
        startTime,
        endTime,
      },
    })

    await prisma.rooms.update({
      where: {
        id: roomId,
      },
      data: {
        status: "IN_USE",
      },
    })

    return reservation

  }
}