import express, {
  Express,
  json,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
const app: Express = express();
app.use(cors());
app.use(json());
app.get("/", (req, res) => {
  res.send("Hello Dev Connector");
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    status,
    message,
  });
});
export default app;
