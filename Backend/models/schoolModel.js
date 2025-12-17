import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String },
  img: { type: String }, 
});

const schoolSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true },

    schoolEmail: { type: String, required: true, unique: true },
    schoolPassword: { type: String, required: true },

    schoolLocation: { type: String, required: true },

    schoolLogo: { type: String },
    images: [{ type: String }], 

    aboutUs: { type: String },

    teamMembers: [teamMemberSchema], 

    address: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    workingPeriod: { type: String },
  },
  { timestamps: true }
);

const schoolModel =
  mongoose.models.School || mongoose.model("School", schoolSchema);

export default schoolModel;
