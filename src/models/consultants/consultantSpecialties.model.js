import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantSpecialtiesModel = new mongoose.Schema({
  consultantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "emailVerificationModel",
    required: true,
  },
  specialty: {
    type: String,
    required: true,
    trim: true,
  },
});

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultantSpecialties",
  consultantSpecialtiesModel,
  "consultantSpecialties"
);
