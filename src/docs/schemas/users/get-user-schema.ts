import z from "zod";

export const findUserSchema = {
  tags: ["user"],
  summary: "Retrieve a user by their unique ID",
  description: "Fetches a registered user's details using their unique ID. Requires a valid user ID in the query string.",
  querystring: z.object({
    id: z.string(),
  }).describe("User's unique identifier (ID) used to fetch the user from the database."),
  response: {
    200: z.object({
      user: z.object({
        id: z.string(),
        email: z.string(),
        name: z.string(),
        role: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    }).describe("Successfully retrieved user data."),
    400: z.object({
      error: z.string(),
    }).describe("Invalid or missing user ID, or user not found."),
  }
}