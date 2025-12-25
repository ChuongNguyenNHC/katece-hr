import { prisma } from '../prismaClient';
import pkg from '@prisma/client';
type TAIKHOAN = pkg.TAIKHOAN;

export const getUserByLogin = async (login: string): Promise<TAIKHOAN | null> => {
  return prisma.tAIKHOAN.findFirst({
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
  toSanXuatID?: string;
}) => {
  return prisma.tAIKHOAN.create({ data });
};
