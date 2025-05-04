import z from "zod";

const STATUS_LIST = ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'INTERDICTED', 'UNAVAILABLE'] as const;

export const findRoomSchema = {
  tags: ["room"],
  summary: "Search for rooms using filters",
  description: "Retrieve a list of rooms by applying one or more filters: status (required), name, and/or location.",
  querystring: z.object({
    status: z.enum(STATUS_LIST).describe("Filter results by room status. This field is required."),
    name: z.string().optional().describe("Optional filter to search by room name (case-insensitive, partial match)."),
    location: z.string().optional().describe("Optional filter to search by room location (case-insensitive, partial match)."),
  }).describe("Query parameters available to filter room search."),
  response: {
    200: z.object({
      rooms: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          location: z.string(),
          status: z.string(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      ),
    }).describe("Rooms retrieved successfully based on the provided filters."),
    400: z.object({
      error: z.string(),
    }).describe("Error because the status is missing, the status doesn't correspond to what was expected or the room doesn't exist or doesn't fit the parameters passed in."),
  }
}