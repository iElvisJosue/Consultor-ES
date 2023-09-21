import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantStudyCVModel = new mongoose.Schema({
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
  ownerID: {
    type: String,
    required: true,
    trim: true,
  },
});

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultantStudy",
  consultantStudyCVModel,
  "consultantStudy"
);
