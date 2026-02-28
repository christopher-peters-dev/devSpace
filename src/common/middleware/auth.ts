import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";

type AuthTokenPayload = JwtPayload & {
  user?: {
    id?: string;
  };
};

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next({
      status: 401,
      message: "No token, authorization denied",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next({
      status: 401,
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtSecret") as string,
    ) as AuthTokenPayload;
    const userId = decoded?.user?.id;

    if (!userId) {
      return next({
        status: 401,
        message: "Token payload is invalid",
      });
    }

    req.user = { id: userId };
    next();
  } catch (err: any) {
    return next({
      status: 401,
      message: "Token is not valid",
    });
  }
};

export default auth;
