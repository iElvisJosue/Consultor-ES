import mongoose from "mongoose";

// CREAMOS EL MODELO
const consultantSkillsCVModel = new mongoose.Schema({
  skill: {
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
  "consultantSkills",
  consultantSkillsCVModel,
  "consultantSkills"
);
