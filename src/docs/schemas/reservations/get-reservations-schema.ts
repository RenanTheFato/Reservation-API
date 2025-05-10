import z from "zod";

export const getReservationsSchema = {
  tags: ["reservations"],
summary: "Retrieve user reservations",
  description: "Returns a list of reservations for the authenticated user. Requires a valid Bearer token for authorization.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: z.object({
      reservations: z.array(z.object({
        id: z.string(),
        userId: z.string(),
        roomId: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })),
    }).describe("Successfully retrieved reservation(s) data."),
    400: z.object({
      error: z.string(),
    }).describe("Error caused by business logic failure or user doesn't have active reservations."),
    401: z.object({
      message: z.string()
    }).describe("Unauthorized access - valid authentication required.")
  }
}