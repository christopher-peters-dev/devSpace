import { Router, Request, Response } from "express";
const router = Router();
router.get("/", (req: Request, res: Response, next) => {
  try {
    res.status(200).json({
      message: "Auth routes",
    });
  } catch (err) {
    next(err);
  }
});
export default router;
