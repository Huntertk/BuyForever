"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const productController_1 = require("../controllers/productController");
const validationResponse_1 = require("../middleware/validationResponse");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post('/new', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), [
    (0, express_validator_1.body)('title')
        .notEmpty()
        .withMessage('Product title is required')
        .isLength({ max: 50 })
        .withMessage('Product title cannot exceed 50 characters')
        .isString()
        .withMessage('Product title must be string'),
    (0, express_validator_1.body)('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ max: 200 })
        .withMessage('Product description cannot exceed 200 characters')
        .isString()
        .withMessage('Product description must be string'),
    (0, express_validator_1.body)('category')
        .notEmpty()
        .withMessage('Product category is required')
        .isLength({ max: 50 })
        .withMessage('Product category cannot exceed 50 characters')
        .isString()
        .withMessage('Product category must be string'),
    (0, express_validator_1.body)('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be in number'),
    (0, express_validator_1.body)('stock')
        .notEmpty()
        .withMessage('Product stock is required')
        .isNumeric()
        .withMessage('Product stock must be in number')
], validationResponse_1.validationResponse, productController_1.createNewProduct);
router.get('/admin/all-products', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), productController_1.getAllProducts);
router.get('/', productController_1.getProducts);
router.get('/:id', productController_1.getProduct);
router.put('/update', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), productController_1.updateProduct);
router.delete('/delete', authMiddleware_1.authUser, (0, authMiddleware_1.authorizeRoles)('admin'), productController_1.deleteProduct);
exports.default = router;
