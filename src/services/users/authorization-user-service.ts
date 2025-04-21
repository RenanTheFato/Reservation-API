import { compare } from "bcryptjs";
import { prisma } from "../../config/prisma";
import { User } from "../../interfaces/user-interface";
import jwt from "jsonwebtoken";

export class AuthorizationUserService{
  async execute({ email, password }: Pick<User, 'email' | 'password'>){
    
    const isUserExists = await prisma.users.findFirst({
      where: {
        email,
      },
    })

    if (!isUserExists) {
      throw new Error("Invalid email or password.")
    }

    const checkPassword = await compare(password, isUserExists.password)

    if (!checkPassword) {
      throw new Error("Invalid email or password.")
    }

    const token = jwt.sign({ id: isUserExists.id }, String(process.env.JWT_SECRET), { expiresIn: '6h' })

    return token
  }
}