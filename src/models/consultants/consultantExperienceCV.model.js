import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantExperienceCVModel = new mongoose.Schema(
  {
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
    ownerID: {
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
  "consultantExperienceCV",
  consultantExperienceCVModel,
  "consultantExperienceCV"
);
