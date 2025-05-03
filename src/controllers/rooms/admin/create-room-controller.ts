import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { logger } from "../../../utils/logger";
import { CreateRoomService } from "../../../services/rooms/admin/create-room-service";

export class CreateRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const validateRoomSchema = z.object({
      name: z.string()
        .min(2, { message: "The room name doesn't meet the minimum number of characters (2)." })
        .max(255, { message: "The room name has exceeded the character limit (255)." })
        .refine((value) => /^[\w\s-]+$/.test(value), { message: "Room name can only contain letters, numbers, spaces, underscores, and hyphens." }),
      description: z.string()
        .min(2, { message: "The room description doesn't meet the minimum number of characters (2)." })
        .max(2500, { message: "The room description has exceeded the character limit (2500)." }),
      location: z.string()
        .min(2, { message: "The room location doesn't meet the minimum number of characters (2)." })
        .max(255, { message: "The room location has exceeded the character limit (255)." }),
    })

    const { name, description, location } = req.body as z.infer<typeof validateRoomSchema>

    try {
      validateRoomSchema.parse(req.body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          code: err.code,
          message: err.message,
          patch: err.path.join("/")
        }))

        logger.error("Validation error when creating a room: Data does not match the requirements.")
        return rep.status(400).send({ statusCode: 400, code: errors[0].code, error: "Bad Request", message: errors[0].message })
      }
    }

    try {
      const admin = {
        adminId: req.user.id,
        adminName: req.user.name,
        adminEmail: req.user.email,
        adminRole: req.user.role,
      }

      const createService = new CreateRoomService()
      const room = await createService.execute({ name, description, location })
      logger.success(`Room created successful. Created By: { id: ${admin.adminId}, name: ${admin.adminName}, email: ${admin.adminEmail}, role: ${admin.adminRole}}`)
      return rep.status(201).send({ message: 'Room created successful', admin, room })
    } catch (error: any) {
      logger.error(`Error on create room: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }
  }
}