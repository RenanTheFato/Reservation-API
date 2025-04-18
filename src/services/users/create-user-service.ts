import { prisma } from "../../config/prisma";
import { User } from "../../interfaces/user-interface";

export class CreateUserService{
  async execute({ email, password, name }: Pick<User, 'email' | 'password' | 'name'> ){

    const isEmailAlreadyExists = await prisma.users.count({
      where: {
        email
      }
    })

    if (isEmailAlreadyExists > 0) {
      throw new Error("The email is already registered.")
    }

    await prisma.users.create({
      data: {
        email,
        password, 
        name
      }
    })
  }
}