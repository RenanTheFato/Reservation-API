import { Reservation } from "@prisma/client";
import { prisma } from "../../config/prisma";

export class GetReservationService {
  async execute({ userId }: Pick<Reservation, 'userId'>) {

    const reservations = await prisma.reservation.findMany({
      where: {
        userId,
      }
    })

    if (Object(reservations).length === 0) {
      throw new Error("User doesn't have active reservations")
    }

    return reservations

  }
}