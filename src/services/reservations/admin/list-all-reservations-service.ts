import { prisma } from "../../../config/prisma";

export class ListAllReservationsService{
  async execute(){

    return await prisma.reservation.findMany()

  }
}