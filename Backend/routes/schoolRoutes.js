import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { getSchoolById, getSchools, registerSchool } from "../controllers/schoolController.js";
const schoolRouter = express.Router();

schoolRouter.post("/registerSchool", upload.single("logo"), registerSchool);
schoolRouter.get("/getSchools", getSchools);
schoolRouter.get("/getSchool/:id", getSchoolById);

export default schoolRouter;