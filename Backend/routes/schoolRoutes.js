import express from "express";
import {
  deleteSchool,
  getSchoolById,
  getSchools,
  registerSchool,
  schoolLogOut,
  schoolSignIn,
  editSchool,
  updateAuthentication,
} from "../controllers/schoolController.js";
import schoolAuth from "../middleware/schoolAuth.js";
import upload from "../middleware/multer.js";

const schoolRouter = express.Router();

schoolRouter.post("/registerSchool", upload.single("logo"), registerSchool);

schoolRouter.get("/getSchools", getSchools);
schoolRouter.get("/getPrincipalDashboard/:id", schoolAuth, getSchoolById);
schoolRouter.get("/getSchool/:id", getSchoolById);

schoolRouter.post("/schoolSignIn", schoolSignIn);
schoolRouter.post("/schoolLogOut", schoolLogOut);

schoolRouter.delete("/deleteSchoolAccount", schoolAuth, deleteSchool);

schoolRouter.put(
  "/editSchool",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "images", maxCount: 20 },
    { name: "teamImages", maxCount: 20 },
  ]),
  schoolAuth,
  editSchool,
);

schoolRouter.put("/updateAuthentication", schoolAuth, updateAuthentication);

export default schoolRouter;
