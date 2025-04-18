import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/users/create-user-controller";
import { GetUserController } from "./controllers/users/get-user-controller";
import { FastifyTypedInstance } from "./@types/types";
import { createUserSchema } from "./docs/schemas/users/create-user-schema";

export async function routes(fastify : FastifyTypedInstance){
  fastify.post("/create-user", { schema: createUserSchema }, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new CreateUserController().handle(req, rep)
  })

  fastify.get('/find-user', async (req: FastifyRequest, rep: FastifyReply) => {
    return new GetUserController().handle(req, rep)
  })
}