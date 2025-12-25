import { Router } from "express";
import { TaiKhoanController } from "./taikhoan.controller";
import { TaiKhoanService } from "./taikhoan.service";
import { authenticateToken, requireRole } from "../middleware/auth.middleware";

const router = Router();
const service = new TaiKhoanService();
const controller = new TaiKhoanController(service);

router.post('/login', controller.login.bind(controller));
router.post('/register', controller.register.bind(controller));
// API cho Tổ trưởng và Nhân sự thêm công nhân
router.post('/create-worker', 
    authenticateToken, 
    requireRole(['Quan ly nhan su', 'To truong', 'Quan ly xuong']), 
    controller.createWorker.bind(controller)
);

// API cho Quản lý sản xuất và Nhân sự thêm nhân viên
router.post('/create-employee', 
    authenticateToken, 
    requireRole(['Quan ly xuong', 'Quan ly nhan su']), 
    controller.createEmployee.bind(controller)
);

// Get lists
router.get('/employees', authenticateToken, controller.getEmployees.bind(controller));
router.get('/workers', authenticateToken, controller.getWorkers.bind(controller));

export { router as TaiKhoanModule };