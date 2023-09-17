import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantSkillsModel = new mongoose.Schema({
  consultantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "emailVerificationModel",
    required: true,
  },
  skill: {
    type: String,
    required: true,
    trim: true,
  },
});

// EXPORTAMOS EL MODELO
export default mongoose.model(
  "consultantSkills",
  consultantSkillsModel,
  "consultantSkills"
);
