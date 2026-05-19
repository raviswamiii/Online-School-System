import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String },
  img: { type: String },
});

const schoolSchema = new mongoose.Schema(
  {
    schoolName: { 
      type: String, 
      required: true,
      trim: true
    },

    schoolEmail: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },

    schoolPassword: { 
      type: String, 
      required: true 
    },

    schoolAddress: { 
      type: String,
      trim: true
    },

    schoolLogo: { type: String },

    images: [{ type: String }],

    aboutUs: { type: String },

    teamMembers: [teamMemberSchema],

    phoneNumber: { type: String },
    email: { type: String },
    workingPeriod: { type: String },
  },
  { timestamps: true }
);

const schoolModel =
  mongoose.models.School || mongoose.model("School", schoolSchema);

export default schoolModel;