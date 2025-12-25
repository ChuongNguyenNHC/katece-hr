import { prisma } from '../prismaClient';
import pkg from '@prisma/client';

type LICHLAM = pkg.LICHLAM;
type CHITIETLICHLAM = pkg.CHITIETLICHLAM;

interface CreateScheduleInput {
    nhanVienID: string;
    ngayLam: Date;
    gioBatDau: Date;
    gioKetThuc: Date;
    diaDiem?: string;
    ghiChu?: string;
}

export const createSchedule = async (data: CreateScheduleInput): Promise<{ lichLam: LICHLAM, chiTiet: CHITIETLICHLAM }> => {
    return prisma.$transaction(async (tx) => {
        // 1. Check if a LICHLAM record with the same time range already exists
        let lichLam = await tx.lICHLAM.findFirst({
            where: {
                gioBatDau: data.gioBatDau,
                gioKetThuc: data.gioKetThuc
            }
        });

        // 2. If not, create a new LICHLAM record
        if (!lichLam) {
            lichLam = await tx.lICHLAM.create({
                data: {
                    gioBatDau: data.gioBatDau,
                    gioKetThuc: data.gioKetThuc,
                    diaDiem: data.diaDiem,
                    ghiChu: data.ghiChu,
                    trangThai: 'Registered', // Initial status
                }
            });
        }

        // 3. Check if the worker is already linked to this shift
        let chiTiet = await tx.cHITIETLICHLAM.findFirst({
            where: {
                nhanVienID: data.nhanVienID,
                lichLamID: lichLam.id
            }
        });

        // 4. If not linked, create a new CHITIETLICHLAM record
        if (!chiTiet) {
            chiTiet = await tx.cHITIETLICHLAM.create({
                data: {
                    nhanVienID: data.nhanVienID,
                    lichLamID: lichLam.id,
                    ngayLam: data.ngayLam,
                }
            });
        }

        return { lichLam, chiTiet };
    });
};

export const findSchedulesByEmployee = async (nhanVienID: string, startDate?: Date, endDate?: Date): Promise<any[]> => {
    return prisma.cHITIETLICHLAM.findMany({
        where: {
            nhanVienID,
            // Optional: filter by date range if needed
            ...(startDate && endDate ? {
                ngayLam: {
                    gte: startDate,
                    lte: endDate
                }
            } : {})
        },
        include: {
            LICHLAM: true,
            CHAMCONG: true
        }
    });
};
