import expressPkg from 'express';
type Request = expressPkg.Request;
type Response = expressPkg.Response;
import { SanPhamService } from './sanpham.service';

export class SanPhamController {
    private readonly service: SanPhamService;

    constructor(service: SanPhamService) {
        this.service = service;
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const result = await this.service.createProduct(data);
            res.status(201).json({
                message: "Tạo sản phẩm thành công",
                data: result
            });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const result = await this.service.getAllProducts();
            res.json(result);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.service.getProductById(id);
            if (!result) return res.status(404).json({ error: "Sản phẩm không tồn tại" });
            res.json(result);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}
