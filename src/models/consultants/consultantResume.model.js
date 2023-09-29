import mongoose from "mongoose";

const consultantResumeModel = new mongoose.Schema({
  profession: {
    type: String,
    trim: true,
    default: "",
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  ownerID: {
    type: String,
    trim: true,
    default: "",
  },
});

export default mongoose.model(
  "consultantResume",
  consultantResumeModel,
  "consultantResume"
);
