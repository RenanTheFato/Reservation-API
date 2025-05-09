import z from "zod";

export const deleteRoomSchema = {
  tags: ["admin"],
  summary: "",
  description: "",
  security: [
    {
      bearerAuth: [],
    },
  ],
  params: z.object({
    id: z.string().describe("The unique identifier of the room to be deleted."),
  }),
  response: {
    204: z.object({}),
    400: z.object({
      error: z.string(),
    }),
    401: z.object({
      message: z.string(),
    }).describe("Unauthorized — valid authentication credentials are required."),
    403: z.object({
      error: z.string(),
    }).describe("Forbidden — only admins are allowed to delete room data."),
  },
}