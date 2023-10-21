import mongoose from "mongoose";

const consultantEducationModel = new mongoose.Schema(
  {
    institution: {
      type: String,
      trim: true,
      default: "",
    },
    educationLevel: {
      type: String,
      trim: true,
      default: "",
    },
    area: {
      type: String,
      trim: true,
      default: "",
    },
    startDate: {
      type: String,
      trim: true,
      default: "",
    },
    endDate: {
      type: String,
      trim: true,
      default: "",
    },
    ownerID: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "consultantEducation",
  consultantEducationModel,
  "consultantEducation"
);
