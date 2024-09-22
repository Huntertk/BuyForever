import express from 'express';
import { authorizeRoles, authUser } from '../middleware/authMiddleware';
import { createNewProduct, getAllProducts, getProduct, updateProduct } from '../controllers/productController';
import { validationResponse } from '../middleware/validationResponse';
import { body } from 'express-validator';


const router  = express.Router();

router.post('/new',
    authUser,
    authorizeRoles('admin'),
    [
        body('title')
        .notEmpty()
        .withMessage('Product title is required')
        .isLength({max:50})
        .withMessage('Product title cannot exceed 50 characters')
        .isString()
        .withMessage('Product title must be string'),
        body('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({max:200})
        .withMessage('Product description cannot exceed 200 characters')
        .isString()
        .withMessage('Product description must be string'),
        body('category')
        .notEmpty()
        .withMessage('Product category is required')
        .isLength({max:50})
        .withMessage('Product category cannot exceed 50 characters')
        .isString()
        .withMessage('Product category must be string'),
        body('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be in number'),
        body('stock')
        .notEmpty()
        .withMessage('Product stock is required')
        .isNumeric()
        .withMessage('Product stock must be in number')
    ],
    validationResponse,
    createNewProduct
)

router.get('/', getAllProducts)
router.get('/:id', getProduct)
router.put('/update',
    authUser,
    authorizeRoles('admin'),
    updateProduct
)

export default router;