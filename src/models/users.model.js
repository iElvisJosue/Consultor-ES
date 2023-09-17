import mongoose from "mongoose";

// CREAMOS EL MODELO
const usersModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  emailCode: {
    type: String,
    trim: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
    trim: true,
    lowercase: true,
    default: "",
  },
  password: {
    type: String,
    trim: true,
    default: "",
  },
  role: {
    type: String,
  },
});

// EXPORTAMOS EL MODELO

export default mongoose.model("users", usersModel, "users");
