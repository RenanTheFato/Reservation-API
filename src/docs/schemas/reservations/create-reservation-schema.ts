import dayjs from "dayjs";
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
      .refine((value) => dayjs(value, "YYYY/MM/DD HH:mm", true)
        .isValid(), { message: "start_time must be in format YYYY/MM/DD HH:mm" })
      .describe("Start time for reservation."),
    end_time: z.string()
      .refine((value) => dayjs(value, "YYYY/MM/DD HH:mm", true)
        .isValid(), { message: "end_time must be in format YYYY/MM/DD HH:mm" })
      .describe("End time for reservation."),
  }),
  response: {
    201: z.object({
      message: z.string(),
      reservation: z.object({
        id: z.string(),
        userId: z.string(),
        roomId: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    }).describe("Reservation successfully created."),
    400: z.union([
      validationErrorSchema.describe("Input validation failed due to incorrect or missing data."),
      serviceErrorSchema.describe("A business logic error occurred during room creation."),
    ]).describe("Error caused by invalid input or business logic failure."),
    401: z.object({
      message: z.string(),
    }).describe("Unauthorized access - valid authentication required."),
  }
}