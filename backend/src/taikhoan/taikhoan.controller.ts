import expressPkg from 'express';
type Request = expressPkg.Request;
type Response = expressPkg.Response;
import { TaiKhoanService } from './taikhoan.service';
import { AuthRequest } from '../middleware/auth.middleware';

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

    async createWorker(req: AuthRequest, res: Response) {
        try {
             // Access user info attached by middleware
             const user = req.user;
             if (!user) return res.status(401).json({ error: 'Unauthorized' });

             const { fullName, phone, cccd, username } = req.body;
             
             const newWorker = await this.service.createWorker(user.id, user.toSanXuatID, {
                 fullName, phone, cccd, username, email: user.email
             });
             
             res.json(newWorker);
        } catch (err: any) {
             res.status(400).json({ error: err.message });
        }
    }

    async createEmployee(req: Request, res: Response) {
        try {
            const { fullName, phone, cccd, username, email, position, password } = req.body;
            
            const newEmployee = await this.service.createEmployee({
                fullName, phone, cccd, username, email, position, password
            });

            res.json(newEmployee);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}