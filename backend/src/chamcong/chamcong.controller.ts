import expressPkg from 'express';
type Request = expressPkg.Request;
type Response = expressPkg.Response;
import { ChamCongService } from './chamcong.service';

export class ChamCongController {
    private readonly service: ChamCongService;

    constructor(service: ChamCongService) {
        this.service = service;
    }

    async checkIn(req: Request, res: Response) {
        try {
            const { userId, chiTietLichLamID } = req.body;
            if (!userId || !chiTietLichLamID) {
                return res.status(400).json({ error: 'Missing userId or chiTietLichLamID' });
            }

            const data = await this.service.checkIn(userId, chiTietLichLamID);
            res.json(data);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async checkOut(req: Request, res: Response) {
        try {
            const { userId, chiTietLichLamID } = req.body;
            if (!userId || !chiTietLichLamID) {
                return res.status(400).json({ error: 'Missing userId or chiTietLichLamID' });
            }

            const data = await this.service.checkOut(userId, chiTietLichLamID);
            res.json(data);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async getTodayStatus(req: Request, res: Response) {
        try {
            const userId = req.query.userId as string;
            if (!userId) {
                return res.status(400).json({ error: 'Missing userId' });
            }
            const data = await this.service.getTodayStatus(userId);
            res.json(data);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}
