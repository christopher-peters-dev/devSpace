import { Router } from "express";
import validate from "../../common/middleware/validate";
import { createUserDTO } from "./dto/create-user-dto";
import { registerUser } from "./user.controller";

const router = Router();
router.post("/register", validate(createUserDTO), registerUser);
export default router;
