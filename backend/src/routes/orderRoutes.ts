import { Router } from "express";
import { authorizeRoles, authUser } from "../middleware/authMiddleware";
import { createOrderByCOD, getAllOrders, getMyOrders, getOrderDetails } from "../controllers/orderController";


const router = Router();

router.get('/admin/get-order', authUser, authorizeRoles('admin'), getOrderDetails)
router.get('/admin/get-all-orders', authUser, authorizeRoles('admin'), getAllOrders)

router.post('/create-cod', authUser, createOrderByCOD)

router.get('/my-orders', authUser, getMyOrders)


export default router;