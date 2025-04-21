import 'fastify';

// declare module 'fastify' {
//   interface FastifyRequest {
//     startTime?: number,
//   }
// }

declare module 'fastify' {
  export interface FastifyRequest{
    user: Partial<{
      id: string,
      email: string,
      password: string,
      name: string,
      role: string,
      createdAt: Date,
      updatedAt: Date,
    }>
  }
}
