import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../../utils/logger";
import z from "zod";
import dayjs from "dayjs";
import { CreateReservationService } from "../../services/reservations/create-reservation-service";
import { Reservation } from "@prisma/client";

export class CreateReservationController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const userId = req.user.id

    if (!userId) {
      logger.warn("The user ID is missing.")
      return rep.status(400).send({ error: "User ID is missing" })
    }

    const { roomId } = req.params as Pick<Reservation, 'roomId'>

    if (!roomId || roomId === '') {
      logger.warn("The room ID is missing or empty.")
      return rep.status(400).send({ error: "The room ID is missing or empty" })
    }

    const validateReservationSchema = z.object({
      start_time: z.string()
        .refine((value) => dayjs(value, "YYYY/MM/DD HH:mm", true)
        .isValid(), { message: "start_time must be in format YYYY/MM/DD HH:mm" }),
      end_time: z.string()
        .refine((value) => dayjs(value, "YYYY/MM/DD HH:mm", true)
        .isValid(), { message: "end_time must be in format YYYY/MM/DD HH:mm" }),
    })

    const { start_time, end_time } = req.body as z.infer<typeof validateReservationSchema>

    try {
      validateReservationSchema.parse(req.body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          code: err.code,
          message: err.message,
          path: err.path.join("/"),
        }))

        logger.error("Validation error while creating a reservation: Data does not meet the requirements.")
        return rep.status(400).send({ statusCode: 400, code: errors[0].code, error: "Bad Request", message: errors[0].message })
      }
    }

    const startTime = dayjs(start_time, "YYYY/MM/DD HH:mm")
    const endTime = dayjs(end_time, "YYYY/MM/DD HH:mm")

    if (endTime.isBefore(startTime)) {
      logger.warn("The end time cannot be earlier than the start time.")
      return rep.status(400).send({ error: "The end time cannot be earlier than the start time." })
    }

    try {
      const createReservationService = new CreateReservationService()
      const reservation = await createReservationService.execute({ userId, roomId, startTime: startTime.toDate(), endTime: endTime.toDate() })
      logger.success("Reservation completed successfully.")
      return rep.status(201).send({ message: "Reservation completed successfully", reservation })
    } catch (error: any) {
      logger.error(`Error while completing the reservation: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }

  }
}