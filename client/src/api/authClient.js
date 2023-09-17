import axios from "./axios";

// PETICIÓN PARA REGISTRAR LOS DATOS DEL CONSULTOR
export const registerDataClient = (data) =>
  axios.post("/client/registerDataClient", data);
