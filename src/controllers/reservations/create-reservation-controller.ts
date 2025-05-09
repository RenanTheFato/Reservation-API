import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../../utils/logger";
import { Room } from "../../interfaces/room-interface";
import z from "zod";
import dayjs from "dayjs";

export class CreateReservationController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const userId = req.user.id

    if (!userId) {
      logger.warn("The user ID is missing.")
      return rep.status(400).send({ error: "User ID is missing" })
    }

    const roomId = req.params as Pick<Room, 'id'>

    if (!roomId) {
      logger.warn("The room ID is missing or is empty.")
      return rep.status(400).send({ error: "The room ID is missing or is empty" })
    }

    const validateReservationSchema = z.object({
      start_time: z.string().refine((value) => dayjs(value, "YYYY/MM/DD HH:mm", true).isValid(), { message: "start_time must be in format YYYY/MM/DD HH:mm" }),
      end_time: z.string().refine((value) => dayjs(value, "YYYY/MM/DD HH:mm", true).isValid(), { message: "end_time must be in format YYYY/MM/DD HH:mm" }),
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

        logger.error("Validation error when creating a reservation: Data does not match the requirements.")
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
      
    } catch (error) {
      
    }

  }
}