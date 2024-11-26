"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationResponse_1 = require("../middleware/validationResponse");
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/register', [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be in string")
        .isLength({ max: 50 })
        .withMessage("name cannot exceeed 50 characters"),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email format is wrong"),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8, max: 32 })
        .withMessage("password must be atleast 8 characters and cannot exceeed 32 characters"),
], validationResponse_1.validationResponse, authController_1.register);
router.post('/login', [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email format is wrong"),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8, max: 32 })
        .withMessage("password must be atleast 8 characters and cannot exceeed 32 characters"),
], validationResponse_1.validationResponse, authController_1.login);
router.get('/logout', authMiddleware_1.authUser, authController_1.logout);
exports.default = router;
