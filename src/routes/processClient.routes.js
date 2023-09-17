// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// ALMACENAMOS EL ENRUTADOR
const router = Router();
// IMPORTAMOS LOS CONTROLADORES
import { sendEmailVerificationCode } from "../controllers/global.controllers.js";
// IMPORTAMOS LA FUNCIÓN QUE ALMACENA LA INFORMACIÓN DEL CLIENTE
import { registerDataClient } from "../controllers/processClient.controllers.js";
// IMPORTAMOS EL MIDDLEWARE PARA VERIFICAR QUE TENGAS UN TOKEN DE ACCESO
import { authRequired } from "../middlewares/validateToken.js";
// IMPORTAMOS EL MIDDLEWARE PARA VERIFICAR EL FORMATO DE LOS DATOS
import { validateData } from "../middlewares/validateData.js";
// IMPORTAMOS EL MIDDLEWARE PARA VALIDAR EL CORREO VERIFICADO
import { emailIsVerified } from "../middlewares/checkEmailVerified.js";
// IMPORTAMOS LOS VALIDADORES DE DATOS
import {
  emailVerificationCode,
  dataClient,
} from "../validators/data.validator.js";

// RUTA PARA ENVIAR VERIFICACIÓN DEL CORREO
router.post(
  "/sendVerificationEmail",
  validateData(emailVerificationCode),
  sendEmailVerificationCode,
  authRequired
);

// RUTA PARA REGISTRAR LOS DATOS DEL CLIENTE
router.post(
  "/registerDataClient",
  authRequired,
  emailIsVerified,
  validateData(dataClient),
  registerDataClient
);

// RUTA PARA CREAR SU CV
router.post("/createCV", (req, res) => {});

// RUTA PARA REGISTRAR SUS DATOS BANCARIOS
router.post("/registerNeedsForm", (req, res) => {});

// EXPORTAMOS EL ENRUTADOR
export default router;
