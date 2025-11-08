import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { deleteSchool, getSchoolById, getSchools, registerSchool, schoolLogOut, schoolSignIn, updateSchool } from "../controllers/schoolController.js";
import schoolAuth from "../middleware/schoolAuth.js";
const schoolRouter = express.Router();

schoolRouter.post("/registerSchool", upload.single("logo"), registerSchool);
schoolRouter.get("/getSchools", getSchools);
schoolRouter.get("/getPrincipalDashboard/:id", schoolAuth, getSchoolById);
schoolRouter.get("/getSchool/:id", getSchoolById);
schoolRouter.post("/schoolSignIn", schoolSignIn)
schoolRouter.post("/schoolLogOut", schoolLogOut)
schoolRouter.delete("/deleteSchoolAccount", schoolAuth, deleteSchool)
schoolRouter.put("/updateSchool", upload.single("changeLogo"), schoolAuth, updateSchool);

export default schoolRouter; 