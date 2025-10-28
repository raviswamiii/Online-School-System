import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true },
    schoolEmail: { type: String, required: true, unique: true },
    schoolPassword: { type: String, required: true },
    schoolLogo: { type: String },
  },
  { timestamps: true }
);

const schoolModel =
  mongoose.models.school || mongoose.model("School", schoolSchema);

export default schoolModel;
