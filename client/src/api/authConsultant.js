import axios from "./axios";

// PETICIÓN PARA REGISTRAR LOS DATOS DEL CONSULTOR
export const registerDataConsultantRequest = (data) =>
  axios.post("/consultant/registerDataConsultant", data);

// PETICIÓN PARA OBTENER EL PERFIL DEL CONSULTOR LOGUEADO
export const getConsultantRequest = () =>
  axios.get("/consultant/getInformationConsultant");

// PETICIÓN PARA OBTENER LOS PROYECTOS DISPONIBLES DEL CONSULTOR
export const getProjectsAvailableRequest = (data) =>
  axios.post("/consultant/getProjectsAvailableConsultant", data);
// PETICIÓN PARA ACTUALIZAR EL RESUMEN DEL CV DEL CONSULTOR
export const addResumeCVRequest = (data) =>
  axios.post("/consultant/createResumeCV", data);

// PETICIÓN PARA ACTUALIZAR EL CV DEL CONSULTOR
export const updateResumeRequest = (data) =>
  axios.put("/consultant/updateResume", data);

// PETICIÓN PARA AGREGAR UNA EXPERIENCIA
export const addNewExperienceRequest = (data) =>
  axios.post("/consultant/addNewExperience", data);

// PETICIÓN PARA ACTUALIZAR UNA EXPERIENCIA
export const updateExperienceRequest = (data) =>
  axios.put("/consultant/updateExperience", data);

// PETICIÓN PARA ELIMINAR UNA EXPERIENCIA
export const deleteExperienceRequest = (id) =>
  axios.delete(`/consultant/deleteExperience/${id}`);

// PETICIÓN PARA AGREGAR UN ESTUDIO
export const addNewStudyRequest = (data) =>
  axios.post("/consultant/addNewStudy", data);

// PETICIÓN PARA ACTUALIZAR UNA EDUCACIÓN
export const updateEducationRequest = (data) =>
  axios.put("/consultant/updateStudy", data);

// PETICIÓN PARA ELIMINAR UNA EDUCACIÓN
export const deleteEducationRequest = (id) =>
  axios.delete(`/consultant/deleteStudy/${id}`);

// PETICIÓN PARA AGREGAR UN AREA
export const addNewAreaRequest = (data) =>
  axios.post("/consultant/addNewArea", data);

// PETICIÓN PARA ELIMINAR UNA AREA
export const deleteAreaRequest = (id) =>
  axios.delete(`/consultant/deleteArea/${id}`);

// PETICIÓN PARA AGREGAR UN IDIOMA
export const addNewLanguageRequest = (data) =>
  axios.post("/consultant/addNewLanguage", data);

// PETICIÓN PARA ELIMINAR UN IDIOMA
export const deleteLanguageRequest = (id) =>
  axios.delete(`/consultant/deleteLanguage/${id}`);

// PETICIÓN PARA AGREGAR UNA HABILIDAD
export const addNewSkillRequest = (data) =>
  axios.post("/consultant/addNewSkill", data);

// PETICIÓN PARA ELIMINAR UNA HABILIDAD
export const deleteSkillRequest = (id) =>
  axios.delete(`/consultant/deleteSkill/${id}`);

// PETICIÓN PARA AGREGAR LA INFORMACIÓN BANCARIA
export const registerDataBankRequest = (data) =>
  axios.post("/consultant/registerDataBank", data);

// PETICIÓN PARA ACTUALIZAR LA INFORMACIÓN BANCARIA
export const updateDataBankRequest = (data) =>
  axios.put("/consultant/updateDataBank", data);
