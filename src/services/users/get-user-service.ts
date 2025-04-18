import { prisma } from "../../config/prisma";
import { User } from "../../interfaces/user-interface";

export class GetUserService{
  async execute({ id }: Pick<User, 'id'>){

    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    })

    if (!user) {
      throw new Error("User not found or does not exist.")
    }

    return user
  }
}