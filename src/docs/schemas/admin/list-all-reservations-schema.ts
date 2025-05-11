import z from "zod";

export const listAllReservationsSchema = {
  tags: ["admin"],
  summary: "List all room reservations",
  description: "Retrieves a list of all room reservations available in the system. Only users with administrative privileges are authorized to access this endpoint. Each returned room includes details such as its unique ID, name, description, location, status, and timestamps for creation and last update.",
  security: [
    {
      bearerAuth: []
    },
  ],
  response: {
    200: z.object({
      rooms: z.array(z.object({
        id: z.string().describe("Unique identifier for the room"),
        name: z.string().describe("Name of the room"),
        description: z.string().describe("Detailed description of the room"),
        location: z.string().describe("Physical or logical location of the room"),
        status: z.string().describe("Current status of the room"),
        createdAt: z.date().describe("Date and time the room was created"),
        updatedAt: z.date().describe("Date and time the room was last updated"),
      })),
    }),
    400: z.object({
      error: z.string().describe("Error message."),
    }).describe("Bad Request — caused by business logic failure or doesn't exists active reservations."),
    401: z.object({
      message: z.string().describe("Message indicating that authentication is required."),
    }).describe("Unauthorized — valid authentication credentials are required."),
    403: z.object({
      error: z.string().describe("Error message indicating lack of permission."),
    }).describe("Forbidden — only admins are allowed to update room data."),
  }
}