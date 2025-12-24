import { prisma } from '../prismaClient.ts';
import pkg from '@prisma/client';

type CHAMCONG = pkg.CHAMCONG;

export const createCheckIn = async (nhanVienID: string): Promise<CHAMCONG> => {
    return prisma.cHAMCONG.create({
        data: {
            nhanVienID,
            checkInTime: new Date(),
        },
    });
};

export const updateCheckOut = async (id: string, soGioLam: number): Promise<CHAMCONG> => {
    return prisma.cHAMCONG.update({
        where: { id },
        data: {
            checkOutTime: new Date(),
            soGioLam: soGioLam,
        },
    });
};

export const findTodayAttendance = async (nhanVienID: string): Promise<CHAMCONG | null> => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return prisma.cHAMCONG.findFirst({
        where: {
            nhanVienID,
            checkInTime: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
        orderBy: {
            checkInTime: 'desc'
        }
    });
};
