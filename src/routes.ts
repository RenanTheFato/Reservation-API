import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/users/create-user-controller";

export async function routes(fastify : FastifyInstance){
  fastify.post("/create-user", async(req: FastifyRequest, rep: FastifyReply) =>{
    return new CreateUserController().handle(req, rep)
  })
}