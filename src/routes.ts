import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/users/create-user-controller";
import { GetUserController } from "./controllers/users/get-user-controller";
import { FastifyTypedInstance } from "./@types/types";
import { createUserSchema } from "./docs/schemas/users/create-user-schema";
import { findUserSchema } from "./docs/schemas/users/get-user-schema";
import { AuthorizationUserController } from "./controllers/users/authorization-user-controller";
import { authorizationUserSchema } from "./docs/schemas/users/authorization-user-schema";
import { DeleteUserController } from "./controllers/users/delete-user-controller";
import { authentication } from "./middlewares/auth-middleware";
import { deleteUserSchema } from "./docs/schemas/users/delete-user-schema";

export async function routes(fastify : FastifyTypedInstance){
  fastify.post("/create-user", { schema: createUserSchema }, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new CreateUserController().handle(req, rep)
  })

  fastify.get("/find-user", { schema: findUserSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new GetUserController().handle(req, rep)
  })

  fastify.post("/authorization-user", { schema: authorizationUserSchema }, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new AuthorizationUserController().handle(req, rep)
  })

  fastify.delete("/delete-user", { preHandler: [authentication] , schema: deleteUserSchema}, async(req: FastifyRequest, rep: FastifyReply) =>{
    return new DeleteUserController().handle(req, rep)
  })
}