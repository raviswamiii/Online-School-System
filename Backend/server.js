import express from "express";
const app = express();
import databaseConnection from "./config/mongodb.js";
import dotenv from "dotenv";
import schoolRouter from "./routes/schoolRoutes.js";

dotenv.config();
databaseConnection();

app.use("/school", schoolRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})