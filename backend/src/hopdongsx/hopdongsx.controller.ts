import expressPkg from 'express';
type Request = expressPkg.Request;
type Response = expressPkg.Response;
import { HopDongSXService } from './hopdongsx.service';

export class HopDongSXController {
    private readonly service: HopDongSXService;

    constructor(service: HopDongSXService) {
        this.service = service;
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const result = await this.service.createContract(data);
            res.status(201).json({
                message: "Tạo hợp đồng thành công",
                data: result
            });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const result = await this.service.getAllContracts();
            res.json(result);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}
