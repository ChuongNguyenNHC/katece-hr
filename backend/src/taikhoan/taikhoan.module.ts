import { Router } from "express";
import { TaiKhoanController } from "./taikhoan.controller";
import { TaiKhoanService } from "./taikhoan.service";
import { authenticateToken, requireRole } from "../middleware/auth.middleware";

const router = Router();
const service = new TaiKhoanService();
const controller = new TaiKhoanController(service);

router.post('/login', controller.login.bind(controller));
router.post('/register', controller.register.bind(controller));

// API cho Tổ trưởng thêm công nhân
router.post('/create-worker', 
    authenticateToken, 
    requireRole(['Tổ trưởng chuyền', 'To truong', 'To truong chuyen']), 
    controller.createWorker.bind(controller)
);

// API cho Quản lý sản xuất thêm nhân viên
router.post('/create-employee', 
    authenticateToken, 
    requireRole(['Quản lý sản xuất', 'Quan ly xuong']), 
    controller.createEmployee.bind(controller)
);

export { router as TaiKhoanModule };