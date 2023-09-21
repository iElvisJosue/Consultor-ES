// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// IMPORTAMOS EL LOGOUT
import {
  sendEmailVerificationCode,
  emailVerification,
  updateUser,
  login,
  getUserProfile,
  logout,
  verifyToken,
} from "../controllers/global.controllers.js";
// IMPORTAMOS EL MIDDLEWARE PARA VERIFICAR QUE TENGAS UN TOKEN DE ACCESO
import { authRequired } from "../middlewares/validateToken.js";
// IMPORTAMOS EL MIDDLEWARE PARA VERIFICAR EL FORMATO DE LOS DATOS
import { validateData } from "../middlewares/validateData.js";
// IMPORTAMOS LOS VALIDADORES DE DATOS
import { emailVerificationCode } from "../validators/data.validator.js";
// IMPORTAMOS EL MIDDLEWARE PARA VALIDAR EL CORREO VERIFICADO
import {
  emailIsNotVerified,
  emailIsVerified,
} from "../middlewares/checkEmailVerified.js";
// IMPORTAMOS EL VALIDADOR DE DATOS
import { dataUser, dataLogin } from "../validators/data.validator.js";
// ALMACENAMOS EL ENRUTADOR
const router = Router();

// RUTA PARA ENVIAR VERIFICACIÓN DEL CORREO
router.post(
  "/sendEmailVerificationCode",
  validateData(emailVerificationCode),
  sendEmailVerificationCode,
  authRequired
);

// RUTA PARA VERIFICAR EL CORREO
router.put(
  "/emailVerification",
  authRequired,
  emailIsNotVerified,
  emailVerification
);

// RUTA PARA ACTUALIZAR LA INFORMACIÓN DEL USUARIO
router.put(
  "/updateUser",
  authRequired,
  emailIsVerified,
  validateData(dataUser),
  updateUser
);

// RUTA PARA OBTENER LOS DATOS DEL USUARIO
router.get("/getUserProfile", authRequired, getUserProfile);

// RUTA PARA INICIAR SESIÓN
router.post("/login", validateData(dataLogin), login);

// RUTA PARA CERRAR SESIÓN
router.put("/logout", logout);

// RUTA PARA VERIFICAR EL TOKEN DEL CONSULTOR
router.get("/verifyToken", verifyToken);

// EXPORTAMOS EL ENRUTADOR
export default router;
