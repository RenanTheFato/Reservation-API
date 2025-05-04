import z from "zod";

export const createUserSchema = {
  tags: ["user"],
  summary: "Create a new user account",
  description: "Registers a new user by validating the provided credentials and storing them in the system.",
  body: z.object({
    email: z.string()
      .email({ message: "The value entered isn't an e-mail or the e-mail is invalid." })
      .describe("User email address - unique in system."),

    password: z.string()
      .min(8, { message: "The password doesn't meet the minimum number of characters (8)." })
      .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter." })
      .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number." })
      .refine((password) => /[@#$*&]/.test(password), { message: "Password must contain at least one of this special characters ('@' '#' '$' '*' '&')." })
      .describe("User password."),

    confirm_password: z.string()
      .describe("Password confirmation - must match the password field exactly"),

    name: z.string()
      .min(2, { message: "The name doesn't meet the minimum number of characters (2)." })
      .max(128, { message: "The name has exceeded the character limit (128)." })
      .describe("User name."),
  }),
  response: {
    201: z.object({
      message: z.string(),
    }).describe("User account created successfully."),
    400: z.object({
      statusCode: z.number(),
      code: z.string(),
      error: z.string(),
      message: z.string(),
    }).describe("Invalid input data. One or more fields failed validation."),
    409: z.object({
      error: z.string()
    }).describe("A user with the provided email already exists, or a conflict occurred during account creation."),
  }
}