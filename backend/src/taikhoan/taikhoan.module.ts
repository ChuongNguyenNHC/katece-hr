import { Router } from "express";
import { TaiKhoanController } from "./taikhoan.controller";
import { TaiKhoanService } from "./taikhoan.service";

const router = Router();
const service = new TaiKhoanService();
const controller = new TaiKhoanController(service);

router.post('/login', controller.login.bind(controller));
router.post('/register', controller.register.bind(controller));
router.post('/logout', controller.logout.bind(controller));

export { router as TaiKhoanModule };