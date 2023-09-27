import axios from "./axios";

// PETICIÓN PARA REGISTRAR LOS DATOS DEL CONSULTOR
export const registerDataClientRequest = (data) =>
  axios.post("/client/registerDataClient", data);

// PETICIÓN PARA AGREGAR UN PROYECTO
export const addNewProjectRequest = (data) =>
  axios.post("/client/addNewProject", data);
