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

export const getEmployees = async () => {
  const users = await prisma.tAIKHOAN.findMany({
    where: {
      position: {
        notIn: ['Cong nhan', 'Cong nhan may']
      }
    },
    include: {
      TOSANXUAT_TAIKHOAN_toSanXuatIDToTOSANXUAT: true
    }
  });

  // Map the ugly relation name to a nicer one
  return users.map(user => ({
    ...user,
    TOSANXUAT: user.TOSANXUAT_TAIKHOAN_toSanXuatIDToTOSANXUAT
  }));
};

export const getWorkers = async () => {
    const users = await prisma.tAIKHOAN.findMany({
      where: {
        position: {
            in: ['Cong nhan', 'Cong nhan may']
        }
      },
      include: {
        TOSANXUAT_TAIKHOAN_toSanXuatIDToTOSANXUAT: true
      }
    });

    return users.map(user => ({
        ...user,
        TOSANXUAT: user.TOSANXUAT_TAIKHOAN_toSanXuatIDToTOSANXUAT
      }));
  };

export const updateUserTeam = async (userId: string, toSanXuatID: string) => {
    return prisma.tAIKHOAN.update({
        where: { id: userId },
        data: { toSanXuatID }
    });
};

export const getProductionTeams = async () => {
    return prisma.tOSANXUAT.findMany();
};
