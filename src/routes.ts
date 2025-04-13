import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/users/create-user-controller";

export async function routes(fastify : FastifyInstance){
  fastify.post("/create-user", async(req: FastifyRequest, rep: FastifyReply) =>{
    return new CreateUserController().handle(req, rep)
  })

  fastify.get('/teste', async (req: FastifyRequest, rep: FastifyReply) => {
    return rep.status(200).send('ok')
  })
}