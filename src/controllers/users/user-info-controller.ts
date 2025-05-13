import { FastifyReply, FastifyRequest } from "fastify";
import { UserInfoService } from "../../services/users/user-info-service";
import { logger } from "../../utils/logger";

export class UserInfoController{
  async handle(req: FastifyRequest, rep: FastifyReply){

    const id = req.user.id as string

    try {
      const userInfoService = new UserInfoService()
      const user = await userInfoService.execute({ id })
      logger.success("User info fetched successfully")
      return rep.status(200).send({ user })
    } catch (error: any) {
      logger.error(`Error while tringy fecth user info: ${error.message}`)
      return rep.status(400).send({ error: error.message })
    }

  }
}