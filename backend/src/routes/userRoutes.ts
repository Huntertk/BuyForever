import { Router } from "express";
import { authorizeRoles, authUser } from "../middleware/authMiddleware";
import { getAllUser, getMe, getUser, updateMe, updateMyPassword } from "../controllers/userController";
import { body } from "express-validator";
import { validationResponse } from "../middleware/validationResponse";

const router = Router();

router.get('/admin/all-users', authUser, authorizeRoles('admin'), getAllUser);
router.get('/admin/get-user', authUser, authorizeRoles('admin'), getUser);
router.get('/me', authUser, getMe);

router.put('/me/update',
    authUser,
    [
        body('name')
        .notEmpty()
        .withMessage("name is required")
        .isString()
        .withMessage("name must be in string")
        .isLength({max:50})
        .withMessage("name cannot exceeed 50 characters"),
        body('email')
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email format is wrong"),
    ],
    validationResponse, 
    updateMe
);

router.put('/me/update/password',
    authUser,
    [
        body('password')
        .notEmpty()
        .withMessage("password is required")
        .isLength({min:8, max:32})
        .withMessage("password must be atleast 8 characters and cannot exceeed 32 characters"),
    ],
    validationResponse,
    updateMyPassword
);

export default router;