import { FastifyReply, FastifyRequest } from "fastify";
import { ListAllRoomsService } from "../../services/rooms/list-all-rooms-service";
import { logger } from "../../utils/logger";

export class ListAllRoomsController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    try {
      const listAllRoomsService = new ListAllRoomsService()
      const rooms = await listAllRoomsService.execute()
      logger.success("All rooms data fetched")
      return rep.status(200).send({ rooms })
    } catch (error: any) {
      logger.error(`Error while trying fetch rooms data: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }

  }
}