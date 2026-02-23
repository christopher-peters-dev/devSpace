import "dotenv/config";
import app from "./app";
import { logger } from "./utils/logger";
import { connectToDB } from "./config/db";
const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectToDB();
  app.listen(port, () => {
    logger.info(`Server is connected and listening at ${port}`);
  });
};
startServer();
