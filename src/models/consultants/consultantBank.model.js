import mongoose from "mongoose";

const consultantBankModel = new mongoose.Schema(
  {
    account: {
      type: String,
      trim: true,
      default: "",
    },
    bank: {
      type: String,
      trim: true,
      default: "",
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    RFC: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    ownerID: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "consultantBank",
  consultantBankModel,
  "consultantBank"
);
