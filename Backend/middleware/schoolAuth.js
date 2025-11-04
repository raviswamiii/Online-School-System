import jwt from "jsonwebtoken";
import schoolModel from "../models/schoolModel.js";
import blacklistTokenModel from "../models/blacklistToken.js";

const schoolAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Token not found." });

    const blackListed = await blacklistTokenModel.findOne({ token });

    if (blackListed)
      return res
        .status(403)
        .json({ success: false, message: "Invalid Token." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await schoolModel
      .findById(decoded.id)
      .select("-schoolPassword");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    req.school = user;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Token." });
    }

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Token expired, please login again.",
        });
    }

    return res
      .status(500)
      .json({ success: false, message: "Authorization error." });
  }
};

export default schoolAuth;
