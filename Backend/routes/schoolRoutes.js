import express from "express";
import registerSchool from "../controllers/schoolController.js";
import upload from "../middleware/uploadMiddleware.js";
const schoolRouter = express.Router();

schoolRouter.post("/registerSchool", upload.single("logo"), registerSchool);

export default schoolRouter;