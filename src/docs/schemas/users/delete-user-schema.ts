import z from "zod";

export const deleteUserSchema = {
  tags: ["user"],
  description: "Delete a registered user by their ID",
  summary: "Delete a unique user by thier ID",
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: z.object({
      message: z.string(),
    }).describe("Deleted user data successfully."),
    400: z.object({
      error: z.string(),
    }).describe("User id is missing or error when trying to delete user."),
  }
}