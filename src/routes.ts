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
import { ListAllUsersController } from "./controllers/users/admin/list-all-users-controller";
import { checkAdmin } from "./middlewares/admin-middleware";
import { CreateRoomController } from "./controllers/rooms/admin/create-room-controller";
import { createRoomSchema } from "./docs/schemas/admin/create-room-schema";
import { FindRoomController } from "./controllers/rooms/find-room-controller";
import { findRoomSchema } from "./docs/schemas/rooms/find-room-schema";
import { PatchRoomController } from "./controllers/rooms/admin/patch-room-controller";
import { patchRoomSchema } from "./docs/schemas/admin/patch-room-schema";
import { DeleteRoomController } from "./controllers/rooms/admin/delete-room-controller";
import { deleteRoomSchema } from "./docs/schemas/admin/delete-room-schema";
import { CreateReservationController } from "./controllers/reservations/create-reservation-controller";
import { createReservationSchema } from "./docs/schemas/reservations/create-reservation-schema";
import { GetReservationController } from "./controllers/reservations/get-reservation-controller";
import { ListAllRoomsController } from "./controllers/rooms/list-all-rooms-controller";
import { listAllRoomsSchema } from "./docs/schemas/rooms/list-all-rooms-schema";
import { ListAllReservationsController } from "./controllers/reservations/admin/list-all-reservations-controller";
import { listAllReservationsSchema } from "./docs/schemas/admin/list-all-reservations-schema";
import { getReservationsSchema } from "./docs/schemas/reservations/get-reservations-schema";

export async function routes(fastify: FastifyTypedInstance) {
  fastify.post("/create-user", { schema: createUserSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateUserController().handle(req, rep)
  })

  fastify.get("/find-user", { schema: findUserSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new GetUserController().handle(req, rep)
  })

  fastify.post("/authorization-user", { schema: authorizationUserSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new AuthorizationUserController().handle(req, rep)
  })

  fastify.delete("/delete-user", { preHandler: [authentication], schema: deleteUserSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new DeleteUserController().handle(req, rep)
  })
  
  fastify.get("/list-all-rooms", { schema: listAllRoomsSchema } ,async (req: FastifyRequest, rep: FastifyReply) => {
    return new ListAllRoomsController().handle(req, rep)
  })

  fastify.get("/find-room", { schema: findRoomSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new FindRoomController().handle(req, rep)
  })

  fastify.post("/create-reservation/:roomId", { preHandler: [authentication], schema: createReservationSchema }, async(req: FastifyRequest, rep: FastifyReply) => {
    return new CreateReservationController().handle(req, rep)
  })

  fastify.get("/get-reservations", { preHandler: [authentication], schema: getReservationsSchema}, async(req: FastifyRequest, rep: FastifyReply) => {
    return new GetReservationController().handle(req, rep)
  })

  fastify.get("/admin/list-all-users", { preHandler: [authentication, checkAdmin] }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new ListAllUsersController().handle(req, rep)
  })

  fastify.get("/admin/list-all-reservations", { preHandler: [authentication, checkAdmin], schema: listAllReservationsSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new ListAllReservationsController().handle(req, rep)
  })

  fastify.post("/admin/create-room", { preHandler: [authentication, checkAdmin], schema: createRoomSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new CreateRoomController().handle(req, rep)
  })

  fastify.patch("/admin/patch-room/:id", { preHandler: [authentication, checkAdmin], schema: patchRoomSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new PatchRoomController().handle(req, rep)
  })

  fastify.delete("/admin/delete-room/:id", { preHandler: [authentication, checkAdmin], schema: deleteRoomSchema }, async (req: FastifyRequest, rep: FastifyReply) => {
    return new DeleteRoomController().handle(req, rep)
  })
}