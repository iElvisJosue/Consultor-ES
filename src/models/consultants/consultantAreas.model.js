import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantAreasModel = new mongoose.Schema(
  {
    nameArea: {
      type: String,
      trim: true,
      default: "",
    },
    ownerID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultantAreas",
  consultantAreasModel,
  "consultantAreas"
);
