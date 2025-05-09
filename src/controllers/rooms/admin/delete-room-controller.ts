import { FastifyReply, FastifyRequest } from "fastify";
import { Room } from "../../../interfaces/room-interface";
import { logger } from "../../../utils/logger";
import { DeleteRoomService } from "../../../services/rooms/admin/delete-room-service";

export class DeleteRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const { id } = req.params as Pick<Room, 'id'>

    if (!id) {
      logger.warn("Id is missing")
      return rep.status(400).send({ error: "Id is missing" })
    }

    try {

      const admin = {
        adminId: req.user.id,
        adminName: req.user.name,
        adminEmail: req.user.email,
        adminRole: req.user.role,
      }

      const deleteRoomService = new DeleteRoomService()
      await deleteRoomService.execute({ id })
      logger.success(`Room with ID ${id} has been deleted successful. Deleted by ${JSON.stringify(admin)}.`)
      return rep.status(204).send()
    } catch (error: any) {
      logger.error(`Error when trying to deleted the room: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }
  }
}