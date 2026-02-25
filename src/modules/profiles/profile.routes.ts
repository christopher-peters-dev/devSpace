import { Router, Request, Response } from "express";

const router = Router();
router.post("/", (req: Request, res: Response) => {
  res.send("Profile Routes");
});
export default router;
