import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function routes(fastify : FastifyInstance){
  fastify.get("/test", async(req: FastifyRequest, rep: FastifyReply) =>{
    rep.status(200).send({ status: "accepetd", code: "200"})
  })
}