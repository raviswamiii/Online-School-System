import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import schoolModel from "../models/schoolModel.js";
import blacklistTokenModel from "../models/blacklistToken.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerSchool = async (req, res) => {
  try {
    const { schoolName, schoolEmail, schoolPassword, schoolLocation } =
      req.body;
    const schoolLogo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!schoolName || !schoolEmail || !schoolPassword || !schoolLocation) {
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
      schoolLocation,
      schoolPassword: hashedPassword,
      schoolLogo,
    });

    const school = await newSchool.save();

    const token = createToken(school._id);

    return res.status(201).json({
      success: true,
      message: "School successfully registered.",
      token,
      school,
    });
  } catch (error) {
    console.error("School registration error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed." });
  }
};

const getSchools = async (req, res) => {
  try {
    const schools = await schoolModel.find().select("-schoolPassword");
    return res.status(200).json({ success: true, schools });
  } catch (error) {
    console.error("Error fetching schools:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching schools.",
    });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await schoolModel.findById(id).select("-schoolPassword");

    if (!school) {
      return res
        .status(404)
        .json({ success: false, message: "School not found." });
    }

    return res.status(200).json({ success: true, school });
  } catch (error) {
    console.error("Error fetching school by ID:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error while fetching school." });
  }
};

const schoolSignIn = async (req, res) => {
  try {
    const { schoolEmail, schoolPassword } = req.body;

    if (!schoolEmail || !schoolPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const exists = await schoolModel.findOne({ schoolEmail });

    if (!exists)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials." });

    const isMatch = await bcrypt.compare(schoolPassword, exists.schoolPassword);

    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials." });

    const token = createToken(exists._id);

    return res.status(200).json({
      success: true,
      message: "Sign in successful.",
      token,
      school: exists,
    });
  } catch (error) {
    console.error("Error while signing in:", error.message);
    return res.status(500).json({ success: false, message: "Sign in failed." });
  }
};

const schoolLogOut = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Token not found." });

    await blacklistTokenModel.create({ token });

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logout successfull." });
  } catch (error) {
    console.log("School Logout error:", error.message);
    return res.status(500).json({ success: false, message: "Log out failed." });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Token not found." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const school = await schoolModel.findOne({ _id: decoded.id });

    if (!school)
      return res
        .status(404)
        .json({ success: false, message: "School not found." });

    await schoolModel.findByIdAndDelete(decoded.id);

    await blacklistTokenModel.create({ token });

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Account deleted successfully." });
  } catch (error) {
    console.log("Error while deleting school:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Account deletion failed." });
  }
};

const updateSchool = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Token not found." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { changeName, changeLocation } = req.body;
    const changeLogo = req.file ? `/uploads/${req.file.filename}` : null;

    const updateData = {};
    if (changeName) updateData.schoolName = changeName;
    if (changeLocation) updateData.schoolLocation = changeLocation;
    if (changeLogo) updateData.schoolLogo = changeLogo;

    const updatedSchool = await schoolModel.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true }
    );

    if (!updatedSchool)
      return res
        .status(404)
        .json({ success: false, message: "School not found." });
    return res.status(200).json({
      success: true,
      message: "School updated successfull.",
      school: updatedSchool,
    });
  } catch (error) {
    console.log("Error during updating school:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error during update." });
  }
};

export {
  registerSchool,
  getSchools,
  getSchoolById,
  schoolSignIn,
  schoolLogOut,
  deleteSchool,
  updateSchool,
};
