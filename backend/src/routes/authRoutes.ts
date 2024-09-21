import express  from "express";
import { validationResponse } from "../middleware/validationResponse";
import { body } from "express-validator";
import { register } from "../controllers/authController";

const router = express.Router();

router.post('/register', [
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
    body('password')
    .notEmpty()
    .withMessage("password is required")
    .isLength({min:8, max:32})
    .withMessage("password must be atleast 8 characters and cannot exceeed 32 characters"),
], validationResponse, register);

export default router;