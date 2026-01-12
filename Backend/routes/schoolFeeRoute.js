import express from "express";
import {
  createFeeOrder,
  verifyFeePayment,
} from "../controllers/schoolFeeController.js";

const schoolFeeRouter = express.Router();

schoolFeeRouter.post("/create-order", createFeeOrder);
schoolFeeRouter.post("/verify", verifyFeePayment);

export default schoolFeeRouter;
