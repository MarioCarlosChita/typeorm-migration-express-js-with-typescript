import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await AppDataSource.initialize();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

bootstrap();
