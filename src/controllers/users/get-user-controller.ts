import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../interfaces/user-interface";
import { GetUserService } from "../../services/users/get-user-service";
import { logger } from "../../utils/logger";

export class GetUserController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const { id } = req.query as Pick<User, 'id'>

    if (!id) {
      logger.error("Id is missing.")
      return rep.status(400).send({ error: "Id is missing."})
    }

    try {
      const getService = new GetUserService()
      const user =  await getService.execute({ id })
      logger.success(`User finded. ID: ${id}`)
      return rep.status(200).send({ user })
    } catch (error: any) {
      logger.error(`Error trying find user: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }
  }
}