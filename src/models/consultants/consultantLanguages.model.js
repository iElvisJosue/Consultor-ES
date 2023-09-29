import mongoose from "mongoose";

const consultantLanguagesModel = new mongoose.Schema({
  nameLanguage: {
    type: String,
    trim: true,
    default: "",
  },
  levelLanguage: {
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
  "consultantLanguages",
  consultantLanguagesModel,
  "consultantLanguages"
);
