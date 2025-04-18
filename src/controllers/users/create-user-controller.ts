import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../../utils/logger";
import { hash } from "bcryptjs";
import z from "zod";
import { CreateUserService } from "../../services/users/create-user-service";

export class CreateUserController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const validadeSchema = z.object({
      email: z.string()
        .email({ message: "The value entered isn't an e-mail or the e-mail is invalid." }),
      password: z.string()
        .min(8, { message: "The password doesn't meet the minimum number of characters (8)." })
        .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter." })
        .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number." })
        .refine((password) => /[@#$*&]/.test(password), { message: "Password must contain at least one of this special characters ('@' '#' '$' '*' '&')." }),
      confirm_password: z.string(),
      name: z.string()
        .min(2, { message: "The name doesn't meet the minimum number of characters (2)." })
        .max(128, { message: "The name has exceeded the character limit (128)." }),
    }).refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match.",
      path: ["confirm_password"],
    })

    const { email, password, name } = req.body as z.infer<typeof validadeSchema>

    try {
      validadeSchema.parse(req.body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) =>({
          code: err.code,
          message: err.message,
          path: err.path.join("/"),
        }))

        logger.error(`Validation error when creating a user: Data does not match the requirements.`)
        return rep.status(400).send({ statusCode: 400, code: errors[0].code, error: "Bad Request", message: errors[0].message })
      }
    }

    const hashedPassword = await hash(password, 10)

    try {
      const createService = new CreateUserService()
      await createService.execute({ email, password: hashedPassword, name })
      logger.success("User Created")
      return rep.status(201).send({ message: "User Created" })
    } catch (error: any) {
      logger.error(`Error on create user: ${error.message}`)
      return rep.status(409).send({ error: error.message })
    }
  }
}