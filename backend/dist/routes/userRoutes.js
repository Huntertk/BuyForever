"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
const express_validator_1 = require("express-validator");
const validationResponse_1 = require("../middleware/validationResponse");
const router = (0, express_1.Router)();
router.get('/admin/all-users', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), userController_1.getAllUser);
router.get('/admin/get-user', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), userController_1.getUser);
router.get('/me', authMiddleware_1.authUser, userController_1.getMe);
router.put('/me/update', authMiddleware_1.authUser, [
    (0, express_validator_1.body)('name')
        .isString()
        .withMessage("name must be in string")
        .isLength({ max: 50 })
        .withMessage("name cannot exceeed 50 characters"),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage("email format is wrong"),
], validationResponse_1.validationResponse, userController_1.updateMe);
router.put('/me/update/password', authMiddleware_1.authUser, [
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8, max: 32 })
        .withMessage("password must be atleast 8 characters and cannot exceeed 32 characters"),
], validationResponse_1.validationResponse, userController_1.updateMyPassword);
exports.default = router;
