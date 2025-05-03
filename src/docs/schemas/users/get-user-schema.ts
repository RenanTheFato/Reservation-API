import z from "zod";

export const findUserSchema = {
  tags: ["user"],
  description: "Find a registered user by their ID",
  summary: "Find a unique user by thier ID",
  querystring: z.object({
    id: z.string(),
  }).describe("Required to can find the user on database."),
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
    }).describe("Fetch user data successfully."),
    400: z.object({
      error: z.string(),
    }).describe("Failed due missing id or if user does not exists/cannot be found."),
  }
}