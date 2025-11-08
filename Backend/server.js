import express from "express";
import databaseConnection from "./config/mongodb.js";
import dotenv from "dotenv";
import schoolRouter from "./routes/schoolRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
databaseConnection();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/schools", schoolRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
