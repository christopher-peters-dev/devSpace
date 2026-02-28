import { Request, Response, NextFunction } from "express";
import { registerUserService } from "./user.service";
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    next(err);
  }
};
