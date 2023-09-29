import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantProfileModel = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    motherLastName: {
      type: String,
      trim: true,
      default: "",
    },
    picture: {
      type: String,
      default: "",
    },
    number: {
      type: String,
      trim: true,
      default: "",
    },
    LinkedIn: {
      type: String,
      trim: true,
      default: "",
    },
    cvIsDone: {
      type: Boolean,
      default: false,
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
  "consultantProfile",
  consultantProfileModel,
  "consultantProfile"
);
