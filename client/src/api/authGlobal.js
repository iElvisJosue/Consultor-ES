import axios from "./axios";

// PETICIÓN PARA INICIAR SESIÓN
export const loginUser = (data) => axios.post("/global/login", data);

// PETICIÓN PARA ENVIAR EL CORREO DE VERIFICACIÓN
export const sendEmailVerificationCode = (email) =>
  axios.post("/global/sendEmailVerificationCode", email);

// PETICIÓN PARA VERIFICAR EL CORREO
export const emailVerification = (codeEntered) =>
  axios.put("/global/emailVerification", codeEntered);

// PETICIÓN PARA OBTENER EL PERFIL DEL USUARIO LOGUEADO
export const getProfile = () => axios.get("/global/getUserProfile");

// PETICIÓN PARA ACTUALIZAR LOS DE USUARIO DEL CONSULTOR
export const registerUserUpdate = (data) =>
  axios.put("/global/updateUser", data);

// PETICIÓN PARA VERIFICAR TOKEN DEL NAVEGADOR
export const verifyToken = () => axios.get("/global/verifyToken");

// PETICIÓN PARA CERRAR SESIÓN
export const logoutUser = (id) => axios.put("/global/logout", id);
