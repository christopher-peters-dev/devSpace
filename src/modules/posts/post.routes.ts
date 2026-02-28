import { Router, Request, Response } from "express";
import auth from "../../common/middleware/auth";

const router = Router();
router.post("/", auth, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Post Routes",
    user: req.user,
  });
});
export default router;
