"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
router.put('/admin/update-order', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), orderController_1.updateOrder);
router.get('/admin/get-order', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), orderController_1.getOrderDetails);
router.get('/admin/get-all-orders', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), orderController_1.getAllOrders);
router.post('/create-cod', authMiddleware_1.authUser, orderController_1.createOrderByCOD);
router.get('/my-orders', authMiddleware_1.authUser, orderController_1.getMyOrders);
exports.default = router;