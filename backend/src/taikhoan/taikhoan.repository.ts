import { prisma } from '../prismaClient.ts';
import pkg from '@prisma/client';
type User = pkg.User;

export const getUserByLogin = async (login: string): Promise<User | null> => {
  return prisma.user.findFirst({
    where: {
      OR: [
        { username: login },
        { email: login },
      ],
    },
  });
};

export const createUser = async (data: {
    username: string;
    fullName: string;
    position: string;
    phone: string;
    cccd: string;
    email: string;
    password: string;
}) => {
  return prisma.user.create({ data });
};
