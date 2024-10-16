import { Router } from "express";
import { authUser } from "../middleware/authMiddleware";
import { createOrderByCOD } from "../controllers/orderController";


const router = Router();

router.post('/create-cod', authUser, createOrderByCOD)

export default router;