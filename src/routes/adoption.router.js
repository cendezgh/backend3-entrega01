import { Router } from "express";
import AdoptionController from "../controllers/adoption.controller.js";
import { passportCall } from "../passport/passportCall.js";
import { checkRole } from "../middlewares/checkRole.js";

const router = Router();
const controller = new AdoptionController();

router.post("/", [passportCall('current'), checkRole('user')], controller.create);
router.get("/", [passportCall('current'), checkRole('admin')], controller.getAll);
router.get("/:id", [passportCall('current'), checkRole('admin')], controller.getById);
router.put("/:id", [passportCall('current'), checkRole('admin')], controller.update);
router.delete("/:id", [passportCall('current'), checkRole('admin')], controller.delete);

export default router;