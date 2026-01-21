import express from "express";
const paymentRouter = express.Router();
import { getKey, paymentVerification, processPayments } from "../controllers/paymentController.js";

paymentRouter.post("/processPayments", processPayments);
paymentRouter.get("/getKey", getKey);
paymentRouter.post("/paymentVerification", paymentVerification);

export default paymentRouter;