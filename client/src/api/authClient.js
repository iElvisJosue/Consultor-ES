import axios from "./axios";

// PETICIÓN PARA REGISTRAR LOS DATOS DEL CONSULTOR
export const registerDataClientRequest = (data) =>
  axios.post("/client/registerDataClient", data);

// PETICIÓN PARA AGREGAR UN PROYECTO
export const addNewProjectRequest = (data) =>
  axios.post("/client/addNewProject", data);

// PETICIÓN PARA OBTENER LOS DATOS DEL CLIENTE
export const getInformationClientRequest = () =>
  axios.get("/client/getInformationClient");

// PETICIÓN PARA ELIMINAR UN PROYECTO
export const deleteProjectRequest = (id) =>
  axios.put("/client/deleteProject", id);

// PETICIÓN PARA COMPLETAR UN PROYECTO
export const completedProjectRequest = (id) =>
  axios.put("/client/completedProject", id);

// PETICIÓN PARA OBTENER LOS CONSULTORES DISPONIBLES
export const getConsultantsAvailableForProjectRequest = (data) =>
  axios.post("/client/getConsultantsAvailableForProject", data);
