import mongoose from "mongoose";

const consultantSkillsModel = new mongoose.Schema({
  nameSkill: {
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
  "consultantSkills",
  consultantSkillsModel,
  "consultantSkills"
);
