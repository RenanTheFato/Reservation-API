import { prisma } from "../../config/prisma";
import { User } from "../../interfaces/user-interface";

export class DeleteUserService{
  async execute({ id }: Pick<User, 'id'>){

    await prisma.users.delete({
      where: {
        id,
      },
    })
  }
}