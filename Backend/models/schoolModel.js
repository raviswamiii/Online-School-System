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

    // ✅ GEO LOCATION (FIXED)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    // ✅ Store readable address (VERY IMPORTANT for UI)
    address: { 
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

// 🔥 REQUIRED for geospatial queries ($near, $geoNear)
schoolSchema.index({ location: "2dsphere" });

const schoolModel =
  mongoose.models.School || mongoose.model("School", schoolSchema);

export default schoolModel;