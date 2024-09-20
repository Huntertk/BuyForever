import express  from "express";
import { validateRegiterInput } from "../middleware/inputValidation";

const router = express.Router();

router.post('/register', validateRegiterInput);

export default router;