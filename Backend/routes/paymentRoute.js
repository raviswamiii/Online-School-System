import express from "express";
const paymentRouter = express.Router();
import { getKey, processPayments } from "../controllers/paymentController.js";

paymentRouter.post("/processPayments", processPayments);
paymentRouter.get("/getKey", getKey);

export default paymentRouter;