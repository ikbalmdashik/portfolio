import bcrypt from "bcrypt";
import { prisma } from "../../database/prisma.js";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Check whether user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      isEmailVerified: false,
      password: hashedPassword,
    },
  });

  // Never return the password/hash
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
}