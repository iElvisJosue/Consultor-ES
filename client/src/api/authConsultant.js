import axios from "./axios";

// PETICIÓN PARA REGISTRAR LOS DATOS DEL CONSULTOR
export const registerDataConsultant = (data) =>
  axios.post("/consultant/registerDataConsultant", data);
