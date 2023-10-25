import axios from "./axios";

// PETICIÓN PARA OBTENER TODOS LOS USUARIOS
export const getUsersAndProjectsRequest = () =>
  axios.get("/admin/getUsersAndProjects");
