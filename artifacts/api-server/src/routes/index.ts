import { Router, type IRouter } from "express";
import contactRouter from "./contact";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(contactRouter);
router.use(healthRouter);

export default router;
