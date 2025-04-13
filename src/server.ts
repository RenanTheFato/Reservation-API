import { fastify } from 'fastify'
import cors from '@fastify/cors'

const server = fastify({ logger: true })

async function start() {

  await server.register(cors)

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