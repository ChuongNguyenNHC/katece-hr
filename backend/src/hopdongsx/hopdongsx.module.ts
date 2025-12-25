import { Router } from "express";
import { HopDongSXController } from "./hopdongsx.controller";
import { HopDongSXService } from "./hopdongsx.service";
import { HopDongSXRepository } from "./hopdongsx.repository";

const router = Router();
const repository = new HopDongSXRepository();
const service = new HopDongSXService(repository);
const controller = new HopDongSXController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.list.bind(controller));

export { router as HopDongSXModule };
