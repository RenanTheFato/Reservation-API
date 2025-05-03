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
  summary: "Create new room",
  description: "Creates a new room only by admins.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  body: z.object({
    name: z.string()
      .min(2, { message: "The room name doesn't meet the minimum number of characters (2)." })
      .max(255, { message: "The room name has exceeded the character limit (255)." })
      .refine((value) => /^[\w\s-]+$/.test(value), { message: "Room name can only contain letters, numbers, spaces, underscores, and hyphens." })
      .describe("Room name - unique in system."),
    description: z.string()
      .min(2, { message: "The room description doesn't meet the minimum number of characters (2)." })
      .max(2500, { message: "The room description has exceeded the character limit (2500)." })
      .describe("Room description - provide detailed information about the room."),
    location: z.string()
      .min(2, { message: "The room location doesn't meet the minimum number of characters (2)." })
      .max(255, { message: "The room location has exceeded the character limit (255)." })
      .describe("Room location - specify where the room is located. This can be a common address or a specific location within a building or department."),
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
    }).describe("Created room data successfully."),
    400: z.union([
      validationErrorSchema.describe("Validation error - input data does not match schema."),
      serviceErrorSchema.describe("Service error - possible business logic issue."),
    ]).describe("Error validating fields or business logic error"),
    401: z.object({
      message: z.string(),
    }).describe("Unauthorized"),
    403: z.object({
      error: z.string(),
    }).describe("Do not have permission to perform the operation (Not a admin or any other role to perform the operation)."),
  }
}