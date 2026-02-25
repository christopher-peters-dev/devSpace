import { Request, Response, NextFunction } from "express";
export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    status,
    message,
  });
};
export const InvalidRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next({
    status: 404,
    message: "Route not found",
  });
};
