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
        id: z.string().describe("Unique identifier for the reservation."),
        userId: z.string().describe("Identifier of the user who made the reservation."),
        roomId: z.string().describe("Identifier of the reserved room."),
        startTime: z.date().describe("Start time of the reservation."),
        endTime: z.date().describe("End time of the reservation."),
        createdAt: z.date().describe("Timestamp when the reservation was created."),
        updatedAt: z.date().describe("Timestamp of the last update to the reservation."),
      })).describe("List of reservation objects."),
    }).describe("Successfully retrieved reservation(s) data."),
    400: z.object({
      error: z.string().describe("Description of the business logic error or reason for failure."),
    }).describe("Bad Request — caused by business logic failure or if the user has no active reservations."),
    401: z.object({
      message: z.string().describe("Message indicating that authentication is required."),
    }).describe("Unauthorized access — valid authentication is required to access reservations."),
  },
}