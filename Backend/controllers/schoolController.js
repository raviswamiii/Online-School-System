import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import schoolModel from "../models/schoolModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerSchool = async (req, res) => {
  try {
    const { schoolName, schoolEmail, schoolPassword } = req.body;

    if (!schoolName || !schoolEmail || !schoolPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const exists = await schoolModel.findOne({ schoolEmail });

    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "School already exists." });
    }

    if (!validator.isEmail(schoolEmail)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email." });
    }

    if (!validator.isStrongPassword(schoolPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8 character long including uppercase, lowercase, symbol and number.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(schoolPassword, salt);

    const newSchool = new schoolModel({
      schoolName,
      schoolEmail,
      schoolPassword: hashedPassword,
    });

    const school = await newSchool.save();

    const token = createToken(school._id);

    return res.status(201).json({
      success: true,
      message: "School successfully registered.",
      token,
    });
  } catch (error) {
    console.error("School registration error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Registration server error." });
  }
};

export default registerSchool;
