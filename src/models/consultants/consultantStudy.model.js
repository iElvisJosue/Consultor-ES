import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantStudyModel = new mongoose.Schema({
  consultantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "emailVerificationModel",
    required: true,
  },
  institution: {
    type: String,
    required: true,
    trim: true,
  },
  educationLevel: {
    type: String,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultantStudy",
  consultantStudyModel,
  "consultantStudy"
);
