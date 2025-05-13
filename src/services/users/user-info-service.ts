import { prisma } from "../../config/prisma";
import { User } from "../../interfaces/user-interface";

export class UserInfoService{
  async execute({ id }: Pick<User, 'id'>){
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    })

    return user
  }
}