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

// PETICIÓN PARA AGREGAR UNA EXPERIENCIA
export const addNewExperience = (data) =>
  axios.put("/consultant/addNewExperience", data);

// PETICIÓN PARA AGREGAR UN ESTUDIO
export const addNewStudy = (data) => axios.put("/consultant/addNewStudy", data);

// PETICIÓN PARA AGREGAR UN AREA
export const addNewArea = (data) => axios.put("/consultant/addNewArea", data);
