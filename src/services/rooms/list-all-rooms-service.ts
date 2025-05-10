import { prisma } from "../../config/prisma";

export class ListAllRoomsService{
  async execute(){

    return await prisma.rooms.findMany()

  }
}