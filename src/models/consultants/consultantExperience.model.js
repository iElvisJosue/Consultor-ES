import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantExperience = new mongoose.Schema(
  {
    consultantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "emailVerificationModel",
      required: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultantExperience",
  consultantExperience,
  "consultantExperience"
);
