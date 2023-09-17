import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultLanguageModel = new mongoose.Schema({
  consultantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "emailVerificationModel",
    required: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    trim: true,
  },
});

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultLanguage",
  consultLanguageModel,
  "consultLanguage"
);
