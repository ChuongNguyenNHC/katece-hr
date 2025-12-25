import { prisma } from "../prismaClient";

export interface CreateProductInput {
    tenSP: string;
    stages: {
        tenCongDoan: string;
        donGia: number;
    }[];
}

export class SanPhamRepository {
    async create(data: CreateProductInput) {
        return await prisma.$transaction(async (tx: any) => {
            // 1. Create SANPHAM
            const product = await tx.sANPHAM.create({
                data: {
                    tenSP: data.tenSP,
                }
            });

            // 2. Create CONGDOAN and Link via CONGDOAN_SANPHAM
            if (data.stages && data.stages.length > 0) {
                for (const stage of data.stages) {
                    const newStage = await tx.cONGDOAN.create({
                        data: {
                            tenCongDoan: stage.tenCongDoan,
                            donGia: stage.donGia,
                        }
                    });

                    await tx.cONGDOAN_SANPHAM.create({
                        data: {
                            sanPhamID: product.id,
                            congDoanID: newStage.id
                        }
                    });
                }
            }

            return product;
        });
    }

    async findAll() {
        return await prisma.sANPHAM.findMany({
            include: {
                CONGDOAN_SANPHAM: {
                    include: {
                        CONGDOAN: true
                    }
                }
            }
        });
    }
    
    async findById(id: string) {
        return await prisma.sANPHAM.findUnique({
            where: { id },
            include: {
                CONGDOAN_SANPHAM: {
                    include: {
                        CONGDOAN: true
                    }
                }
            }
        });
    }
}
