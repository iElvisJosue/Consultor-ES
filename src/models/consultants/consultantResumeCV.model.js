import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantResumeCVModel = new mongoose.Schema(
  {
    profession: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
  "consultantResumeCV",
  consultantResumeCVModel,
  "consultantResumeCV"
);
