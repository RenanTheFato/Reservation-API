import { FastifyReply, FastifyRequest } from "fastify";
import { ListAllReservationsService } from "../../../services/reservations/admin/list-all-reservations-service";
import { logger } from "../../../utils/logger";

export class ListAllReservationsController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const admin = {
      adminId: req.user.id,
      adminName: req.user.name,
      adminEmail: req.user.email,
      adminRole: req.user.role,
    }

    try {
      const listAllReservationsService = new ListAllReservationsService()
      const reservations = await listAllReservationsService.execute()
      logger.success(`All reservations fetched successfully. Fetched by ${JSON.stringify(admin)}.`)
      return rep.status(200).send({ reservations })
    } catch (error: any) {
      logger.error(`Error while trying fetch reservations data: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }

  }
}