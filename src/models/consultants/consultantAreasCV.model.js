import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantAreasCVModel = new mongoose.Schema({
  nameArea: {
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
  "consultantAreas",
  consultantAreasCVModel,
  "consultantAreas"
);
