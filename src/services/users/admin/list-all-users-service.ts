import { prisma } from "../../../config/prisma";

export class ListAllUsersService{
  async execute() {
    
    const users = await prisma.users.findMany({
      omit: {
        password: true,
      },
      orderBy: {
        name: "asc",
      },
    })

    return users

  }
}