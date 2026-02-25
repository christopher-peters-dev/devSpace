import { Request, Response, NextFunction } from "express";
const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      const errors =
        err.issues?.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
        })) || [];

      return res.status(400).json({
        message: "Validation Failed",
        errors,
      });
    }
  };
export default validate;
