import { prisma } from "../prismaClient";

export interface CreateContractInput {
    tenHopDongSX: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    status?: string;
    items: {
        productID: string;
        congDoanID: string; // Added congDoanID
        quantity: number;
    }[];
}

export class HopDongSXRepository {
    async create(data: CreateContractInput) {
        return await prisma.$transaction(async (tx: any) => {
            // 1. Create HOPDONGSX
            const contract = await tx.hOPDONGSX.create({
                data: {
                    tenHopDongSX: data.tenHopDongSX,
                    ngayBatDau: new Date(data.ngayBatDau),
                    ngayKetThuc: new Date(data.ngayKetThuc),
                    trangThaiHopDongSX: data.status || "Chờ xử lý",
                }
            });

            // 2. Create PHANCONGSANXUAT for each product and stage
            if (data.items && data.items.length > 0) {
                await tx.pHANCONGSANXUAT.createMany({
                    data: data.items.map(item => ({
                        hopDongID: contract.id,
                        sanPhamID: item.productID,
                        congDoanID: item.congDoanID, // Set congDoanID
                        trangThai: "Đang chờ"
                    }))
                });
            }

            return contract;
        });
    }

    async findAll() {
        return await prisma.hOPDONGSX.findMany({
            include: {
                PHANCONGSANXUAT: {
                    include: {
                        SANPHAM: true,
                        CONGDOAN: true
                    }
                }
            }
        });
    }
}
