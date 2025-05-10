import z from "zod";

export const listAllRoomsSchema = {
  tags: ["room"],
  summary: "List all available rooms",
  description: "This endpoint retrieves a list of all rooms registered in the system, including their detailed information.",
  response: {
    200: z.object({
      rooms: z.array(z.object({
        id: z.string().describe("Unique identifier for the room"),
        name: z.string().describe("Name of the room"),
        description: z.string().describe("Detailed description of the room"),
        location: z.string().describe("Physical or logical location of the room"),
        status: z.string().describe("Current status of the room (e.g., available, occupied)"),
        createdAt: z.date().describe("Date and time the room was created"),
        updatedAt: z.date().describe("Date and time the room was last updated"),
      }))
    }).describe("Successful response containing the list of all rooms."),
    400: z.object({
      error: z.string().describe("Description of the error that occurred."),
    }).describe("Bad request. The request was malformed or contains invalid parameters."),
  }
}