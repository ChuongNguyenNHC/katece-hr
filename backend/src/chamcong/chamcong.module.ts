import { Router } from "express";
import { ChamCongController } from "./chamcong.controller.ts";
import { ChamCongService } from "./chamcong.service.ts";

const router = Router();
const service = new ChamCongService();
const controller = new ChamCongController(service);

router.post('/check-in', controller.checkIn.bind(controller));
router.post('/check-out', controller.checkOut.bind(controller));
router.get('/today', controller.getTodayStatus.bind(controller));

export { router as ChamCongModule };
