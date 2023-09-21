import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantSpecialtiesCVModel = new mongoose.Schema({
  specialty: {
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
  "consultantSpecialties",
  consultantSpecialtiesCVModel,
  "consultantSpecialties"
);
