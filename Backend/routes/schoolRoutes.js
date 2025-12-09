import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  deleteSchool,
  getSchoolById,
  getSchools,
  registerSchool,
  schoolLogOut,
  schoolSignIn,
  updateSchool,
} from "../controllers/schoolController.js";
import schoolAuth from "../middleware/schoolAuth.js";

const schoolRouter = express.Router();

// REGISTER (Logo only)
schoolRouter.post(
  "/registerSchool",
  upload.single("logo"),
  registerSchool
);

// GET ALL SCHOOLS
schoolRouter.get("/getSchools", getSchools);

// PRINCIPAL DASHBOARD
schoolRouter.get("/getPrincipalDashboard/:id", schoolAuth, getSchoolById);

// PUBLIC DATA
schoolRouter.get("/getSchool/:id", getSchoolById);

// LOGIN / LOGOUT
schoolRouter.post("/schoolSignIn", schoolSignIn);
schoolRouter.post("/schoolLogOut", schoolLogOut);

// DELETE ACCOUNT
schoolRouter.delete("/deleteSchoolAccount", schoolAuth, deleteSchool);

// UPDATE SCHOOL (Logo, Images, Team Images, Text Fields)
schoolRouter.put(
  "/updateSchool",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 20 },
    { name: "teamImages", maxCount: 20 },
  ]),
  schoolAuth,
  updateSchool
);

export default schoolRouter;
