import { prisma } from '../prismaClient';
import pkg from '@prisma/client';

type CHAMCONG = pkg.CHAMCONG;

export const createCheckIn = async (nhanVienID: string, chiTietLichLamID: string): Promise<CHAMCONG> => {
    // 1. Create ChamCong record
    const newChamCong = await prisma.cHAMCONG.create({
        data: {
            nhanVienID,
            checkInTime: new Date(),
        },
    });

    // 2. Link it to the specific CHITIETLICHLAM record
    await prisma.cHITIETLICHLAM.update({
        where: { id: chiTietLichLamID },
        data: { chamCongID: newChamCong.id }
    });

    return newChamCong;
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

export const findAttendanceByShift = async (chiTietLichLamID: string): Promise<CHAMCONG | null> => {
    const detail = await prisma.cHITIETLICHLAM.findUnique({
        where: { id: chiTietLichLamID },
        include: { CHAMCONG: true }
    });
    return detail?.CHAMCONG || null;
};

export const getShiftWithSchedule = async (id: string) => {
    return prisma.cHITIETLICHLAM.findUnique({
        where: { id },
        include: { LICHLAM: true }
    });
};
