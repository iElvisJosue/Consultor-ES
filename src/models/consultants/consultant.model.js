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
    picture: {
      type: String,
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
  "consultantProfile",
  consultantProfileModel,
  "consultantProfile"
);
