import express, { Express, json } from "express";
import userRoutes from "./modules/users/user.routes";
import profileRoutes from "./modules/profiles/profile.routes";
import postRoutes from "./modules/posts/post.routes";
import authRoutes from "./modules/auth/auth.routes";
import {
  handleErrors,
  InvalidRouteHandler,
} from "./common/middleware/errorHandler";
import cors from "cors";
const app: Express = express();
app.use(cors());
app.use(json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use(InvalidRouteHandler);
app.use(handleErrors);
export default app;
