import mongoose from "mongoose";
import { logger } from "../utils/logger";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL as string);
    logger.info(`Database Connected: ${conn.connection.host}`);
  } catch (error: any) {
    logger.error(`DB connection failed: ${error.message}`);
    process.exit(1); // stop server if DB fails
  }
};
