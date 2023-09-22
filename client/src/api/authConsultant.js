import axios from "./axios";

// PETICIÓN PARA REGISTRAR LOS DATOS DEL CONSULTOR
export const registerDataConsultant = (data) =>
  axios.post("/consultant/registerDataConsultant", data);

// PETICIÓN PARA OBTENER EL PERFIL DEL CONSULTOR LOGUEADO
export const getConsultant = () =>
  axios.get("/consultant/getInformationConsultant");

// PETICIÓN PARA ACTUALIZAR EL RESUMEN DEL CV DEL CONSULTOR
export const addResumeCV = (data) =>
  axios.post("/consultant/createResumeCV", data);

// PETICIÓN PARA ACTUALIZAR EL QUE YA TIENE UN CV ACTIVO
export const updateCV = () => axios.put("/consultant/updateCVIsDone");
