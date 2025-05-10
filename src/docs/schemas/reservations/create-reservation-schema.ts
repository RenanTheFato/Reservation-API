import dayjs from "dayjs";
import z from "zod";

const validationErrorSchema = z.object({
  statusCode: z.literal(400).describe("HTTP status code indicating a bad request."),
  code: z.string().describe("Specific code representing the type of validation error."),
  error: z.literal("Bad Request").describe("Standard HTTP error label."),
  message: z.string().describe("Detailed explanation of the validation issue."),
}).describe("Input validation failed due to incorrect or missing data.")

const serviceErrorSchema = z.object({
  error: z.string().describe("Message describing the service-level or business logic error."),
}).describe("A business logic error occurred during reservation creation.")

export const createReservationSchema = {
  tags: ["reservations"],
  summary: "Create a new room reservation",
  description: "Allows an authenticated user to create a reservation for a specific room by providing the desired start and end times. The times must follow the format YYYY/MM/DD HH:mm.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  body: z.object({
    start_time: z.string()
      .refine((value) => dayjs(value, "YYYY/MM/DD HH:mm", true).isValid(), {
        message: "start_time must be in format YYYY/MM/DD HH:mm",
      })
      .describe("Start time for the reservation, formatted as YYYY/MM/DD HH:mm."),
    end_time: z.string()
      .refine((value) => dayjs(value, "YYYY/MM/DD HH:mm", true).isValid(), {
        message: "end_time must be in format YYYY/MM/DD HH:mm",
      })
      .describe("End time for the reservation, formatted as YYYY/MM/DD HH:mm."),
  }),
  response: {
    201: z.object({
      message: z.string().describe("Confirmation message indicating successful reservation."),
      reservation: z.object({
        id: z.string().describe("Unique identifier for the reservation."),
        userId: z.string().describe("ID of the user who made the reservation."),
        roomId: z.string().describe("ID of the room being reserved."),
        startTime: z.date().describe("Start time of the reservation."),
        endTime: z.date().describe("End time of the reservation."),
        createdAt: z.date().describe("Timestamp when the reservation was created."),
        updatedAt: z.date().describe("Timestamp of the most recent update to the reservation."),
      }).describe("Object containing details about the newly created reservation."),
    }).describe("Reservation successfully created."),
    400: z.union([
      validationErrorSchema,
      serviceErrorSchema,
    ]).describe("Bad Request — due to validation failure or business rule violation."),
    401: z.object({
      message: z.string().describe("Message indicating that authentication is required."),
    }).describe("Unauthorized — valid authentication credentials are required."),
  },
}