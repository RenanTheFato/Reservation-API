import z from "zod";

export const deleteRoomSchema = {
  tags: ["admin"],
  summary: "Delete a room by ID",
  description: "Removes a registered room from the system using their unique identifier (ID). Requires authentication.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  params: z.object({
    id: z.string().describe("The unique identifier of the room to be deleted."),
  }),
  response: {
    204: z.object({}).describe("Deleted successful, no content on response."),
    400: z.object({
      error: z.string().describe("Error message"),
    }).describe("Invalid or missing room ID, or an error occurred while attempting to delete the room."),
    401: z.object({
      message: z.string().describe("Message indicating the user is not authenticated."),
    }).describe("Unauthorized — valid authentication credentials are required."),
    403: z.object({
      error: z.string().describe("Message indicating the user lacks necessary permissions."),
    }).describe("Forbidden — only admins are allowed to delete room data."),
  },
}