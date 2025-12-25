import { Router } from "express";
import { SanPhamController } from "./sanpham.controller";
import { SanPhamService } from "./sanpham.service";
import { SanPhamRepository } from "./sanpham.repository";

const router = Router();
const repository = new SanPhamRepository();
const service = new SanPhamService(repository);
const controller = new SanPhamController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.list.bind(controller));
router.get('/:id', controller.getById.bind(controller));

export { router as SanPhamModule };
