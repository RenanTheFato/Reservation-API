import z from "zod";

export const userInfoSchema = {
  tags: ["user"],
  summary: "Get current authenticated user's information",
  description: "Returns profile details of the currently authenticated user. The user must be authenticated via Bearer token. This endpoint provides the user's ID, email, name, role, and timestamps.",
  security: [
    {
      bearerAuth: [],
    },
  ],
  response: {
    200: z.object({
      user: z.object({
        id: z.string().describe("Unique identifier of the user."),
        email: z.string().describe("Email address of the user."),
        name: z.string().describe("Full name of the user."),
        role: z.string().describe("Role assigned to the user (e.g., 'admin', 'user')."),
        createdAt: z.date().describe("Timestamp when the user was created."),
        updatedAt: z.date().describe("Timestamp when the user was last updated."),
      }).describe("Authenticated user information."),
    }).describe("Successful response with user data."),
    
    400: z.object({
      error: z.string().describe("Description of the error encountered."),
    }).describe("Bad request — the request was invalid or missing required fields."),
    
    401: z.object({
      message: z.string().describe("Message indicating that authentication is required."),
    }).describe("Unauthorized access — valid authentication is required to access this endpoint."),
  }
}