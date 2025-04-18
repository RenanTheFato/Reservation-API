import { fastify } from 'fastify';
import { routes } from "./routes";
import { logger } from './utils/logger';
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import cors from '@fastify/cors';

const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

async function start() {
  logger.info("Starting server...")
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)
  
  await server.register(cors, { origin: "*" })
  await server.register(fastifySwagger, {
    openapi: {
      openapi: '3.1.1',
      info: {
        title: 'Reservation API',
        version: '0.1.0',
      },
    },
    transform: jsonSchemaTransform,
  })
  await server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })
  await server.register(routes)

  await server.listen({
    host: '0.0.0.0',
    port: 3333
  }).then(() => {
    logger.success("HTTP server running on port 3333!")
  }).catch((error) =>{
    logger.error(`Error initializing HTTP server: ${error}`)
    process.exit(1)
  })
}

start()