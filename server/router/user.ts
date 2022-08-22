import { Router } from "express";
import {
  signup,
  login,
  userProfile,
  otherUsers
} from "../controller/user";

import { auth_check } from '../middleware/auth_check';

const router = Router();

router.get("/details", auth_check, userProfile);
router.get("/users", auth_check, otherUsers);

router.post("/signup", signup);
router.post("/login", login);


export default router;
