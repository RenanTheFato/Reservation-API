import { fastify } from 'fastify';
import { routes } from "./routes";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import cors from '@fastify/cors';

const server = fastify({ logger: true })

async function start() {

  await server.register(cors)
  await server.register(fastifySwagger, {
    openapi: {
      openapi: '3.1.1',
      info: {
        title: 'Reservation API',
        version: '0.1.0',
      },
    }
  })
  await server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })
  await server.register(routes)

  await server.listen({
    host: '0.0.0.0',
    port: 3333
  }).then(() => {
    console.log("HTTP server running on port 3333!")
  }).catch((error) =>{
    console.error(`Error initializing HTTP server: ${error}`)
    process.exit(1)
  })
}

start()