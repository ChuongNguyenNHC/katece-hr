import { Router } from "express";
import { TaiKhoanController } from "./taikhoan.controller";
import { TaiKhoanService } from "./taikhoan.service";
import { authenticateToken, requireRole } from "../middleware/auth.middleware";

const router = Router();
const service = new TaiKhoanService();
const controller = new TaiKhoanController(service);

router.post('/login', controller.login.bind(controller));
router.post('/register', controller.register.bind(controller));
router.post('/logout', controller.logout.bind(controller));

// API cho Tổ trưởng thêm công nhân
router.post('/create-worker',
    authenticateToken,
    requireRole(['To Truong']),
    controller.createWorker.bind(controller)
);

// API cho Quản lý sản xuất thêm nhân viên
router.post('/create-employee',
    authenticateToken,
    requireRole(['Quan Ly Xuong']),
    controller.createEmployee.bind(controller)
);

export { router as TaiKhoanModule };