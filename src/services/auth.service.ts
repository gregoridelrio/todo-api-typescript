import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

interface RegisterUserInput {
  email: string;
  password: string;
}

export const registerUser = async ({
  email,
  password
}: RegisterUserInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    return null;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash
    }
  });

  return user;
};