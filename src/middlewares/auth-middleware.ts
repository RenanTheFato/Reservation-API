import { FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../utils/logger";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

export async function authentication(req: FastifyRequest, rep: FastifyReply) {
  
  const { authorization } = req.headers 

  if (!authorization) {
    logger.warn("Auhtorization not found on request headers.")
    return rep.status(401).send({ message: "Bearer Token is missing" })
  }

  const token = authorization.split("")[1]

  try {
    
    const id = jwt.verify(token, String(process.env.JWT_SECRET)) as string


    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    })

    if (!user) {
      logger.error("Unauthorized user, user not found.")
      return rep.status(401).send({ message: "Unauthorized" })
    }

    req.user = user

    return

  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      logger.error("An invalid token has been inserted into the auth middleware.")
      return rep.status(401).send({ message: 'Invalid token' })
    }
    if (error.name === 'TokenExpiredError') {
      logger.error("An expired has been inserted into the auth middleware.")
      return rep.status(401).send({ message: 'Token expired' })
    }
    logger.error(`Error trying to authenticate ${error.message}.`)
    return rep.status(500).send({ message: 'Authentication error' })
  }
}