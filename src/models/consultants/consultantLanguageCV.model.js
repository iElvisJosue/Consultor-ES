import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultLanguageCVModel = new mongoose.Schema({
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
  ownerID: {
    type: String,
    required: true,
    trim: true,
  },
});

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultLanguage",
  consultLanguageCVModel,
  "consultLanguage"
);
