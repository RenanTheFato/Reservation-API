import { FastifyReply, FastifyRequest } from "fastify";
import { GetReservationService } from "../../services/reservations/get-reservation-service";
import { logger } from "../../utils/logger";

export class GetReservationController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const userId = req.user.id as string

    try {
      const getReservationService = new GetReservationService()
      const reservations = await getReservationService.execute({ userId })
      logger.success("Reservations fetched successfully")
      return rep.status(200).send({ reservations })
    } catch (error: any) {
      logger.error(`Error while trying to fetch reservations: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }

  }
}