import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { getSchools, registerSchool } from "../controllers/schoolController.js";
const schoolRouter = express.Router();

schoolRouter.post("/registerSchool", upload.single("logo"), registerSchool);
schoolRouter.get("/getSchools", upload.single("logo"), getSchools);

export default schoolRouter;