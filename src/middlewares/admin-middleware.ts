import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../utils/logger";

export async function checkAdmin(req: FastifyRequest, rep: FastifyReply){

  const role = req.user.role

  if (role === 'ADMIN') {
    logger.success(`Admin authentication successful => ID: ${req.user.id}, Name: ${req.user.name}, Email: ${req.user.email} `)
    return
  }

  return rep.status(403).send({ error: 'Not allowed to proceed. Is not a admin.' })
}