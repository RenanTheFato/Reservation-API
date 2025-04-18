// import chalk from "chalk";
// import { FastifyInstance, FastifyRequest } from "fastify";

// export async function httpLogger(fastify: FastifyInstance) {
//   fastify.addHook('onRequest', async (req: FastifyRequest) => {

//     req.startTime = Date.now()
//   })

//   fastify.addHook('onResponse', async (req, rep) => {
//     const start = req.startTime || Date.now()
//     const duration = Date.now() - start
//     const method = req.method
//     const url = req.url
//     const statusCode = rep.statusCode
    
//     const color = statusCode >= 500
//     ? chalk.bgHex('#ad0320').hex('#ffffff')
//     : statusCode >= 400
//     ? chalk.bgHex('#ad0320').hex('#ffffff')
//     : statusCode >= 300
//     ? chalk.bgHex('#9e0fd6').hex('#ffffff')
//     : statusCode >= 200
//     ? chalk.bgHex('#04b816').hex('#ffffff')
//     : chalk.bgHex('#056a80').hex('#ffffff')

//     const message = `${statusCode} | ${method} => ${url} (${duration}ms)`

//     console.log(`${chalk.hex('#80a0c2')(`[${new Date().toLocaleString()}]`)} ${color(` ${message} `)}`)
//   })
// }