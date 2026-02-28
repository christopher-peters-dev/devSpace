import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";

type AuthTokenPayload = JwtPayload & {
  user?: {
    id?: string;
  };
};

const auth = (req: Request, res: Response, next: NextFunction) => {
  const xAuthToken = req.header("x-auth-token");
  const authorizationHeader = req.header("Authorization");

  const token =
    xAuthToken ||
    (authorizationHeader?.startsWith("Bearer ")
      ? authorizationHeader.split(" ")[1]
      : null);

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
    const message =
      err instanceof jwt.TokenExpiredError
        ? "Token has expired"
        : "Token is not valid";
    return next({ status: 401, message });
  }
};

export default auth;
