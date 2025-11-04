import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { getSchoolById, getSchools, registerSchool, schoolSignIn } from "../controllers/schoolController.js";
const schoolRouter = express.Router();

schoolRouter.post("/registerSchool", upload.single("logo"), registerSchool);
schoolRouter.get("/getSchools", getSchools);
schoolRouter.get("/getSchool/:id", getSchoolById);
schoolRouter.post("/schoolSignIn", schoolSignIn)

export default schoolRouter;