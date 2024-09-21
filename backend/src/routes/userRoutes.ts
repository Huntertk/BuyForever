import { Router } from "express";
import { authorizeRoles, authUser } from "../middleware/authMiddleware";
import { getAllUser, getMe, getUser } from "../controllers/userController";

const router = Router();

router.get('/all-users', authUser, authorizeRoles('user'), getAllUser);
router.get('/get-user', authUser, authorizeRoles('user'), getUser);
router.get('/me', authUser, getMe);

export default router;