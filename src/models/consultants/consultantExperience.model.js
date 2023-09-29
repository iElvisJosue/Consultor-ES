import mongoose from "mongoose";

const consultantExperienceModel = new mongoose.Schema({
  position: {
    type: String,
    trim: true,
    default: "",
  },
  company: {
    type: String,
    trim: true,
    default: "",
  },
  resume: {
    type: String,
    trim: true,
    default: "",
  },
  startDate: {
    type: String,
    trim: true,
    default: "",
  },
  endDate: {
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
  "consultantExperience",
  consultantExperienceModel,
  "consultantExperience"
);
