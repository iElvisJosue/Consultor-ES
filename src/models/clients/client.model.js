import mongoose from "mongoose";

const clientProfileModel = new mongoose.Schema(
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
    RFC: {
      type: String,
      trim: true,
      uppercase: true,
      default: "",
    },
    number: {
      type: String,
      trim: true,
      default: "",
    },
    businessName: {
      type: String,
      trim: true,
      default: "",
    },
    serviceArea: {
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

// EXPORTAMOS EL MODEL
export default mongoose.model(
  "clientProfile",
  clientProfileModel,
  "clientProfile"
);
