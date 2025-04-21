import { FastifyReply, FastifyRequest } from "fastify";
import { AuthorizationUserService } from "../../services/users/authorization-user-service";
import { logger } from "../../utils/logger";
import z from "zod";

export class AuthorizationUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {

    const validadeSchema = z.object({
      email: z.string({ message: "The value entered isn't a string type." })
        .email({ message: "The value entered isn't an e-mail or the e-mail is invalid." }),
      password: z.string({ message: "The value entered isn't a string type." })
    })

    const { email, password } = req.body as z.infer<typeof validadeSchema>

    try {
      validadeSchema.parse(req.body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(`Data type validation error: Data does not match the requirements.`)
        return rep.status(400).send({ error: error.errors })
      }
    }

    try {
      const authService = new AuthorizationUserService()
      const token = await authService.execute({ email, password })
      logger.success("Authentication successful.")
      return rep.status(200).send({ token })
    } catch (error: any) {
      logger.error(`Unable to authenticate due to an error: ${error.message}`)
      return rep.status(401).send({ error: error.message })
    }
  }
}