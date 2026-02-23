import mongoose from "mongoose";
import config from "config";
import { logger } from "../utils/logger";
const db_url = config.get("mongoURI");
export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(db_url as string);
    logger.info(`Database Connected: ${conn.connection.host}`);
  } catch (error: any) {
    logger.error(`DB connection failed: ${error.message}`);
    process.exit(1); // stop server if DB fails
  }
};
