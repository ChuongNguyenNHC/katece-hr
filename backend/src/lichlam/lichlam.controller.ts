import { Request, Response } from "express";
import { LichLamService } from "./lichlam.service";

export class LichLamController {
    private service: LichLamService;

    constructor(service: LichLamService) {
        this.service = service;
    }

    async register(req: Request, res: Response) {
        try {
            const { nhanVienID, ngayLam, gioBatDau, gioKetThuc, diaDiem, ghiChu } = req.body;

            // Allow getting user ID from authenticated token if not explicitly provided (future proofing)
            // For now assuming passed in body or relying on req.body

            const result = await this.service.registerSchedule({
                nhanVienID,
                ngayLam,
                gioBatDau,
                gioKetThuc,
                diaDiem,
                ghiChu
            });

            res.status(201).json({
                message: "Schedule registered successfully",
                data: result
            });
        } catch (error: any) {
            console.error(error);
            res.status(400).json({ message: error.message || "Failed to register schedule" });
        }
    }

    async getMySchedule(req: Request, res: Response) {
        try {
            const { userId } = req.query;
            if (!userId) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            const schedules = await this.service.getMySchedule(userId as string);
            res.status(200).json({ data: schedules });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
