import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantAreasModel = new mongoose.Schema({
  consultantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "emailVerificationModel",
    required: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
});

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultantAreas",
  consultantAreasModel,
  "consultantAreas"
);
