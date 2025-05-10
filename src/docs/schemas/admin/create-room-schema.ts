import z from "zod";

const validationErrorSchema = z.object({
  statusCode: z.literal(400).describe("The HTTP status code for a bad request."),
  code: z.string().describe("A specific error code indicating the validation issue."),
  error: z.literal("Bad Request").describe("Standard HTTP error label."),
  message: z.string().describe("Detailed explanation of the validation error."),
}).describe("Input validation failed due to incorrect or missing data.")

const serviceErrorSchema = z.object({
  error: z.string().describe("Message describing the service-level error."),
}).describe("A business logic error occurred during room creation.")

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
      .refine((value) => /^[\w\s-]+$/.test(value), { message: "Room name can only contain letters, numbers, spaces, underscores, and hyphens.",})
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
      message: z.string().describe("Success message confirming room creation."),
      admin: z.object({
        adminId: z.string().describe("Unique identifier of the admin who created the room."),
        adminName: z.string().describe("Name of the admin."),
        adminEmail: z.string().describe("Email address of the admin."),
        adminRole: z.string().describe("Role or permission level of the admin."),
      }).describe("Details of the admin who performed the creation."),
      room: z.object({
        id: z.string().describe("Unique identifier of the newly created room."),
        name: z.string().describe("Name of the room."),
        description: z.string().describe("Description of the room."),
        location: z.string().describe("Location of the room."),
        status: z.string().describe("Current status of the room."),
        createdAt: z.date().describe("Date and time the room was created."),
        updatedAt: z.date().describe("Date and time of the last update."),
      }).describe("Information about the newly created room."),
    }).describe("Room created successfully with the provided details."),
    400: z.union([
      validationErrorSchema,
      serviceErrorSchema,
    ]).describe("Error caused by invalid input or business logic failure."),
    401: z.object({
      message: z.string().describe("Message indicating the user is not authenticated."),
    }).describe("Unauthorized access - valid authentication required."),
    403: z.object({
      error: z.string().describe("Message indicating the user lacks necessary permissions."),
    }).describe("Forbidden access - insufficient permissions to perform this action (only admins can create rooms)."),
  },
}