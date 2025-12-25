import { SanPhamRepository, CreateProductInput } from "./sanpham.repository";

export class SanPhamService {
    private readonly repository: SanPhamRepository;

    constructor(repository: SanPhamRepository) {
        this.repository = repository;
    }

    async createProduct(data: CreateProductInput) {
        if (!data.tenSP) throw new Error("Tên sản phẩm là bắt buộc.");
        return await this.repository.create(data);
    }

    async getAllProducts() {
        const products = await this.repository.findAll();
        // Map data to a cleaner format for frontend
        return products.map((p: any) => ({
            id: p.id,
            tenSP: p.tenSP,
            created_at: p.created_at,
            stages: p.CONGDOAN_SANPHAM.map((cs: any) => cs.CONGDOAN)
        }));
    }

    async getProductById(id: string) {
        const p = await this.repository.findById(id);
        if (!p) return null;
        return {
            id: p.id,
            tenSP: p.tenSP,
            created_at: p.created_at,
            stages: p.CONGDOAN_SANPHAM.map((cs: any) => cs.CONGDOAN)
        };
    }
}
