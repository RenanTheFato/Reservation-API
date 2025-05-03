import { FastifyReply, FastifyRequest } from "fastify";
import { ListAllUsersService } from "../../../services/users/admin/list-all-users-service";
import { logger } from "../../../utils/logger";

export class ListAllUsersController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const id = req.user.id
    const role = req.user.role
    const name = req.user.name

    if (!id) {
      return rep.status(400).send({ error: "User id is missing" })
    }

    const accessTime = new Date().toISOString()

    try {
      const listAllService = new ListAllUsersService()
      const users = await listAllService.execute()
      logger.success(`Request accepted to list all users. Requested by ${id}, Role: ${role}, Name: ${name} at DateTime ${accessTime}`)
      return rep.status(200).send({ users })
    } catch (error: any) {
      logger.error(`Error trying list all users: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }
  }
}