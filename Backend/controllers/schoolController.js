import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import schoolModel from "../models/schoolModel.js";
import blacklistTokenModel from "../models/blacklistToken.js";
import {v2 as cloudinary} from "cloudinary";

const createToken = (id, schoolName) => {
  return jwt.sign({ id, schoolName }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const registerSchool = async (req, res) => {
  try {
    const { schoolName, schoolEmail, schoolPassword, schoolLocation } =
      req.body;

    if (!schoolName || !schoolEmail || !schoolPassword || !schoolLocation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const exists = await schoolModel.findOne({ schoolEmail });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "School already exists.",
      });
    }

    if (!validator.isEmail(schoolEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    if (!validator.isStrongPassword(schoolPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8 characters long including uppercase, lowercase, number and symbol.",
      });
    }

    let schoolLogo = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "schools/logo",
      });
      console.log("CLOUDINARY RESULT:", result);
      schoolLogo = result.secure_url;
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
    const token = createToken(school._id, school.schoolName);

    return res.status(201).json({
      success: true,
      message: "School successfully registered.",
      token,
      school,
    });
  } catch (error) {
    console.error("School registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
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

    const token = createToken(exists._id, exists.schoolName);

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

const editSchool = async (req, res) => {
  try {
    /* ================= AUTH ================= */
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const school = await schoolModel.findById(decoded.id);
    if (!school) {
      return res
        .status(404)
        .json({ success: false, message: "School not found" });
    }

    /* ================= BODY ================= */
    const {
      schoolName,
      aboutUs,
      address,
      phoneNumber,
      email,
      workingPeriod,
      teamMembers,
    } = req.body;

    if (schoolName) school.schoolName = schoolName;
    if (aboutUs) school.aboutUs = aboutUs;
    if (address) school.address = address;
    if (phoneNumber) school.phoneNumber = phoneNumber;
    if (email) school.email = email;
    if (workingPeriod) school.workingPeriod = workingPeriod;

    const parsedMembers = teamMembers ? JSON.parse(teamMembers) : [];

    /* ================= FILES ================= */
    const files = req.files || {};

    /* ---------- LOGO ---------- */
    if (files.logo?.length) {
      const result = await cloudinary.uploader.upload(
        files.logo[0].path,
        { folder: "schools/logo" }
      );
      school.schoolLogo = result.secure_url;
    }

    /* ---------- SCHOOL IMAGES ---------- */
    if (files.images?.length) {
      const uploadedImages = await Promise.all(
        files.images.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "schools/images",
          })
        )
      );

      const imageUrls = uploadedImages.map((img) => img.secure_url);
      school.images = [...(school.images || []), ...imageUrls];
    }

    /* ---------- TEAM MEMBERS ---------- */
    const teamFiles = files.teamImages || [];
    let imageIndex = 0;

    for (let i = 0; i < parsedMembers.length; i++) {
      if (teamFiles[imageIndex]) {
        const result = await cloudinary.uploader.upload(
          teamFiles[imageIndex].path,
          { folder: "schools/team" }
        );
        parsedMembers[i].img = result.secure_url;
        imageIndex++;
      }
    }

    if (parsedMembers.length) {
      school.teamMembers = parsedMembers;
    }

    /* ================= SAVE ================= */
    const updatedSchool = await school.save();

    return res.status(200).json({
      success: true,
      message: "School edited successfully",
      school: updatedSchool,
    });
  } catch (error) {
    console.error("Edit school error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateAuthentication = async (req, res) => {
  try {
    const schoolId = req.school?._id;

    if (!schoolId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: School not found",
      });
    }

    const { changeEmail, changePassword } = req.body;

    if (!changeEmail && !changePassword) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update",
      });
    }

    const school = await schoolModel.findById(schoolId);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    if (changeEmail) {
      const emailExists = await schoolModel.findOne({
        schoolEmail: changeEmail,
      });

      if (emailExists && emailExists._id.toString() !== schoolId.toString()) {
        return res.status(400).json({
          success: false,
          message: "Email already taken",
        });
      }
      school.schoolEmail = changeEmail;
    }

    if (changePassword) {
      const hashedPass = await bcrypt.hash(changePassword, 10);
      school.schoolPassword = hashedPass;
    }

    await school.save();

    return res.status(200).json({
      success: true,
      message: "Authentication updated successfully",
      school,
    });
  } catch (error) {
    console.error("Update authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export {
  registerSchool,
  getSchools,
  getSchoolById,
  schoolSignIn,
  schoolLogOut,
  deleteSchool,
  editSchool,
  updateAuthentication,
};
