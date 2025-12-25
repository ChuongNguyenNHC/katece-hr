import { Router } from "express";
import { LichLamController } from "./lichlam.controller";
import { LichLamService } from "./lichlam.service";

const router = Router();
const service = new LichLamService();
const controller = new LichLamController(service);

router.post('/register', controller.register.bind(controller));
router.get('/my-schedule', controller.getMySchedule.bind(controller));

// Future endpoints:
// router.get('/my-schedule', controller.getMySchedule.bind(controller));

export { router as LichLamModule };
