import { FastifyReply, FastifyRequest } from "fastify";
import { Room } from "../../interfaces/room-interface";
import { logger } from "../../utils/logger";
import { FindRoomService } from "../../services/rooms/find-room-service";

export class FindRoomController{
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const STATUS_LIST: string[] = ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'INTERDICTED', 'UNAVAILABLE']
    const { status } = req.query as Pick<Room, 'status'>
    const { name, location } = req.query as Partial<Pick<Room, 'name' | 'location'>>

    if (!status) {
      logger.error("Missing status on req.query")
      return rep.status(400).send({ error: "The status is missing" })
    }

    if (!STATUS_LIST.includes(status)) {
      logger.warn("The value entered is not supported")
      return rep.status(400).send({ error: "The status entered is not supported, select one of the status list", STATUS_LIST })
    }

    try {
      const findService = new FindRoomService()
      const rooms = await findService.execute({ status, name, location })
      logger.success("Room(s) finded")
      rep.status(200).send({ rooms })
    } catch (error: any) {
      logger.error(`Error on find room(s): ${error.message}`)
      rep.status(400).send({ error: error.message })
    }
  }
}