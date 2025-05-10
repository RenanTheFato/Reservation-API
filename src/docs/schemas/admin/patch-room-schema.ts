import z from "zod";
import { Status } from "../../../interfaces/room-interface";

const validationErrorSchema = z.object({
  statusCode: z.literal(400).describe("HTTP status code indicating a bad request."),
  code: z.string().describe("Application-specific error code."),
  error: z.literal("Bad Request").describe("Standard HTTP error label."),
  message: z.string().describe("Human-readable explanation of the validation error."),
}).describe("Validation error — body or parameters did not meet the expected format.")

const serviceErrorSchema = z.object({
  error: z.string().describe("Message describing the business logic error."),
}).describe("Service-level error — e.g., business rule violation or room already exists.")

export const patchRoomSchema = {
  tags: ["admin"],
  summary: "Update room details",
  description: "Allows an admin to partially update the details of a room. At least one field must be provided. Fields not sent will remain unchanged.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  params: z.object({
    id: z.string().describe("The unique identifier of the room to be updated."),
  }),
  body: z.object({
    name: z.string()
      .min(2, { message: "The room name must have at least 2 characters." })
      .max(255, { message: "The room name must have a maximum of 255 characters." })
      .refine((value) => /^[\w\s-]+$/.test(value), {
        message: "The room name may only contain letters, numbers, spaces, underscores, and hyphens.",
      })
      .optional()
      .describe("New name for the room. Optional, but must follow format rules if provided."),
    description: z.string()
      .min(2, { message: "The room description must have at least 2 characters." })
      .max(2500, { message: "The room description must have a maximum of 2500 characters." })
      .optional()
      .describe("New description for the room. Optional."),
    location: z.string()
      .min(2, { message: "The room location must have at least 2 characters." })
      .max(255, { message: "The room location must have a maximum of 255 characters." })
      .optional()
      .describe("New location of the room. Optional."),
    status: z.nativeEnum(Status)
      .optional()
      .describe("New status of the room. Must be a valid enum value. Optional."),
  }),
  response: {
    200: z.object({
      message: z.string().describe("Success message."),
      room: z.object({
        id: z.string().describe("Unique identifier of the room."),
        name: z.string().describe("Name of the room."),
        description: z.string().describe("Description of the room."),
        location: z.string().describe("Location of the room."),
        status: z.string().describe("Current status of the room."),
        createdAt: z.date().describe("Timestamp when the room was created."),
        updatedAt: z.date().describe("Timestamp of the last room update."),
      }).describe("Updated room object."),
      admin: z.object({
        adminId: z.string().describe("ID of the admin who updated the room."),
        adminName: z.string().describe("Name of the admin."),
        adminEmail: z.string().describe("Email address of the admin."),
        adminRole: z.string().describe("Role of the admin."),
      }).describe("Admin user who performed the operation."),
    }).describe("Room updated successfully — returns the updated room and admin information."),
    400: z.union([
      validationErrorSchema,
      serviceErrorSchema,
    ]).describe("Bad Request — the request body is invalid, missing required fields, or contains business rule violations."),
    401: z.object({
      message: z.string().describe("Message indicating that authentication is required."),
    }).describe("Unauthorized — valid authentication credentials are required."),
    403: z.object({
      error: z.string().describe("Error message indicating lack of permission."),
    }).describe("Forbidden — only admins are allowed to update room data."),
  },
}