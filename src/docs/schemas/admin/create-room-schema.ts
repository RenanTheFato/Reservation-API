import z from "zod";

const validationErrorSchema = z.object({
  statusCode: z.literal(400),
  code: z.string(),
  error: z.literal("Bad Request"),
  message: z.string(),
})

const serviceErrorSchema = z.object({
  error: z.string(),
})

export const createRoomSchema = {
  tags: ["admin"],
  summary: "Create a new room",
  description: "Allows admins to create a new room with the provided details. Only accessible to users with admin privileges.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  body: z.object({
    name: z.string()
      .min(2, { message: "The room name must be at least 2 characters long." })
      .max(255, { message: "The room name must not exceed 255 characters." })
      .refine((value) => /^[\w\s-]+$/.test(value), { message: "Room name can only contain letters, numbers, spaces, underscores, and hyphens." })
      .describe("The unique name of the room within the system."),
    description: z.string()
      .min(2, { message: "The room description must be at least 2 characters long." })
      .max(2500, { message: "The room description must not exceed 2500 characters." })
      .describe("A detailed description of the room, including its features and usage."),
    location: z.string()
      .min(2, { message: "The room location must be at least 2 characters long." })
      .max(255, { message: "The room location must not exceed 255 characters." })
      .describe("The location of the room, either a general address or a specific area within a building."),
  }),
  response: {
    201: z.object({
      message: z.string(),
      admin: z.object({
        adminId: z.string(),
        adminName: z.string(),
        adminEmail: z.string(),
        adminRole: z.string(),
      }),
      room: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        location: z.string(),
        status: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    }).describe("Room created successfully with the provided details."),
    400: z.union([
      validationErrorSchema.describe("Input validation failed due to incorrect or missing data."),
      serviceErrorSchema.describe("A business logic error occurred during room creation."),
    ]).describe("Error caused by invalid input or business logic failure."),
    401: z.object({
      message: z.string(),
    }).describe("Unauthorized access - valid authentication required."),
    403: z.object({
      error: z.string(),
    }).describe("Forbidden access - insufficient permissions to perform this action (only admins can create rooms)."),
  },
}