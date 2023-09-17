import mongoose from "mongoose";

// CONEXIÓN A LA BASE DE DATOS
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("CONEXIÓN A LA BASE DE DATOS EXITOSA");
  } catch (error) {
    console.log("ERROR AL CONECTAR A LA BASE DE DATOS");
  }
};
