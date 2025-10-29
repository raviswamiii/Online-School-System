import express from "express";
import registerSchool from "../controllers/schoolController.js";
const schoolRouter = express.Router();

schoolRouter.post("/registerSchool", registerSchool);

export default schoolRouter;