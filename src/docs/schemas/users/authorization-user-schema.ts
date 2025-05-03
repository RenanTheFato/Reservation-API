import z from "zod";

export const authorizationUserSchema = {
  tags: ["user", "auth"],
  description: "",
  summary: "Performs user authentication.",
  body: z.object({
    email: z.string({ message: "The value entered isn't a string type." })
      .email({ message: "The value entered isn't an e-mail or the e-mail is invalid." })
      .describe("User email address - unique in system."),
    password: z.string({ message: "The value entered isn't a string type." })
      .describe("User password."),
  }),
  response: {
    200: z.object({
      token: z.string(),
    }).describe("User authentication successful."),
    400: z.object({
      statusCode: z.number(),
      code: z.string(),
      error: z.string(),
      message: z.string(),
    }).describe("Body validation failed."),
    401: z.object({
      error: z.string()
    }).describe("Incorrect credentials.")
  }
}