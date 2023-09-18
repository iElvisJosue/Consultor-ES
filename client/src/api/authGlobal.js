import axios from "./axios";

// PETICIÓN PARA INICIAR SESIÓN
// export const loginUser = (data) => axios.post("/global/login", data);
export const loginUser = (data) => {
  console.log({ data });
  return fetch("http://localhost:4000/api/global/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      yourUserName: data.yourUserName,
      yourPassword: data.yourPassword,
    }),
  });
};
// PETICIÓN PARA ENVIAR EL CORREO DE VERIFICACIÓN
export const sendEmailVerificationCode = (email) =>
  axios.post("/global/sendEmailVerificationCode", email);

// PETICIÓN PARA VERIFICAR EL CORREO
export const emailVerification = (codeEntered) =>
  axios.put("/global/emailVerification", codeEntered);

// PETICIÓN PARA OBTENER EL PERFIL DEL USUARIO LOGUEADO
export const getProfile = (userID) =>
  axios.get("/global/getUserProfile", userID);

// PETICIÓN PARA ACTUALIZAR LOS DE USUARIO DEL CONSULTOR
export const registerUserUpdate = (data) =>
  axios.put("/global/updateUser", data);

// PETICIÓN PARA VERIFICAR TOKEN DEL NAVEGADOR
export const verifyToken = () => axios.get("/global/verifyToken");

// PETICIÓN PARA CERRAR SESIÓN
export const logoutUser = () => axios.post("/global/logout");
