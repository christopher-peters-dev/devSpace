import { Request, Response, NextFunction } from "express";
import { registerUserService } from "./user.service";
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerUserService(req.body);
  } catch (err: any) {
    next(err);
  }
};
