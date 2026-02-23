import express, {
  Express,
  json,
  Request,
  Response,
  NextFunction,
} from "express";
import userRoutes from "./routes/api/user.routes";
import profileRoutes from "./routes/api/profile.routes";
import postRoutes from "./routes/api/post.routes";
import authRoutes from "./routes/api/auth.routes";
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
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
export default app;
