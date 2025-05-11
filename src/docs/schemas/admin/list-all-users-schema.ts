import z from "zod";

export const listAllUsersSchema = {
  tags: ["admin"],
  summary: "Retrieve all registered users",
  description: "Fetches a complete list of all user accounts registered in the system. Access to this endpoint is restricted to users with administrative privileges. Each returned user object includes essential account information such as unique identifier, name, email, role, and timestamps for account creation and last update.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: z.object({
      users: z.array(z.object({
        id: z.string().describe("Unique identifier of the user."),
        email: z.string().describe("Email address associated with the user account."),
        name: z.string().describe("Full name of the user."),
        role: z.string().describe("Role assigned to the user (e.g., admin, user)."),
        createdAt: z.date().describe("Timestamp indicating when the user was created."),
        updatedAt: z.date().describe("Timestamp indicating the last update to the user record."),
      })),
    }),
    400: z.object({
      error: z.string().describe("Detailed error message."),
    }).describe("Bad Request — caused by business logic failure or invalid query."),
    401: z.object({
      message: z.string().describe("Message indicating that authentication is required."),
    }).describe("Unauthorized — valid authentication credentials are required."),
    403: z.object({
      error: z.string().describe("Error message indicating lack of permission."),
    }).describe("Forbidden — only admins are allowed to access user data."),
  },
}