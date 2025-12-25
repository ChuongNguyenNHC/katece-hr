import expressPkg from 'express';
type Request = expressPkg.Request;
type Response = expressPkg.Response;
import { TaiKhoanService } from './taikhoan.service';

export class TaiKhoanController {
    private readonly service: TaiKhoanService;
    constructor(service: TaiKhoanService) {
        this.service = service;
    }

    async login(req: Request, res: Response) {
        try {
            const { login, password } = req.body;
            const data = await this.service.login(login, password);
            res.json(data);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { username, email, password, fullName, position, phone, cccd } = req.body;
            const user = await this.service.register({
                username, email, password, fullName, position, phone, cccd
            });
            res.json(user);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            // Logic xóa session hoặc blacklist token nếu cần
            res.json({ message: 'Đăng xuất thành công' });
        } catch (err: any) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng xuất' });
        }
    }
}