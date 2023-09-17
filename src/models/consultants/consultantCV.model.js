import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantCVModel = new mongoose.Schema(
  {
    consultantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "emailVerificationModel",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
  "consultantCV",
  consultantCVModel,
  "consultantCV"
);
