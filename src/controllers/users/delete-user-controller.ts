import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../../utils/logger";
import { DeleteUserService } from "../../services/users/delete-user-service";

export class DeleteUserController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const id = req.user.id

    if (!id) {
      logger.error("User id is missing.")
      return rep.status(400).send({ error: "User id is missing" })
    }

    try {
      const deleteService = new DeleteUserService()
      await deleteService.execute({ id })
      logger.success(`User successfully deleted. ID of the user who was deleted: ${id}`)
      return rep.status(204)
    } catch (error: any) {
      logger.error(`Error when trying to deleted the user: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }
  }
}