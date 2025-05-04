import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../../../utils/logger";
import { PatchRoomService } from "../../../services/rooms/admin/pacth-room-service";
import { Room, Status } from "../../../interfaces/room-interface";
import z from "zod";

export class PatchRoomController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as Pick<Room, 'id'>

    if (!id) {
      logger.error("Room ID is missing.")
      return rep.status(400).send({ error: "Room ID is missing" })
    }

    const validatePatchRoom = z.object({
      name: z.string()
        .min(2, { message: "The room name doesn't meet the minimum number of characters (2)." })
        .max(255, { message: "The room name has exceeded the character limit (255)." })
        .refine((value) => /^[\w\s-]+$/.test(value), { message: "Room name can only contain letters, numbers, spaces, underscores, and hyphens." })
        .optional(),
      description: z.string()
        .min(2, { message: "The room description doesn't meet the minimum number of characters (2)." })
        .max(2500, { message: "The room description has exceeded the character limit (2500)." })
        .optional(),
      location: z.string()
        .min(2, { message: "The room location doesn't meet the minimum number of characters (2)." })
        .max(255, { message: "The room location has exceeded the character limit (255)." })
        .optional(),
      status: z.nativeEnum(Status)
        .optional(),
    })

    const { name, description, location, status } = req.body as z.infer<typeof validatePatchRoom>

    try {
      const data = validatePatchRoom.parse(req.body)
      if (Object.keys(data).length === 0) {
        logger.warn("No field has been entered on room patch, at least one field is required.")
        return rep.status(400).send({ error: "No field has been entered, at least one field is required to proceed with the patch operation" })
      }

      if (Object.values(data).every((value) => value === undefined || (typeof value === "string" && value.trim() === ""))) {
        logger.warn("PATCH request received with all fields empty or missing.")
        return rep.status(400).send({ error: "All fields has been entered, but all is empty, at least one non-empty field must be provided for update" })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          code: err.code,
          message: err.message,
          patch: err.path.join("/")
        }))
        logger.error(`Error on validate the schema: ${JSON.stringify(error.errors)}`)
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

      const patchRoomService = new PatchRoomService()
      const roomHasPatch = await patchRoomService.execute({ id, name, description, location, status })
      logger.success(`Room patched successful. Patched by ${JSON.stringify(admin)}. New Room Data: ${JSON.stringify(roomHasPatch)}`)
      return rep.status(200).send({ message: "Room patched successful", room: roomHasPatch, admin: admin})
    } catch (error: any) {
      logger.error(`Room cannot be patched due a error: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }
  }
}