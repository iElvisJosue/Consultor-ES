// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// ALMACENAMOS EL ENRUTADOR
const router = Router();
// IMPORTAMOS LOS CONTROLADORES
import {
  registerDataConsultant,
  getInformationConsultant,
  createResumeCV,
  updateCVIsDone,
} from "../controllers/processConsultant.controllers.js";
// IMPORTAMOS EL MIDDLEWARE PARA VERIFICAR QUE TENGAS UN TOKEN DE ACCESO
import { authRequired } from "../middlewares/validateToken.js";
// IMPORTAMOS EL MIDDLEWARE PARA VERIFICAR EL FORMATO DE LOS DATOS
import { validateData } from "../middlewares/validateData.js";
// IMPORTAMOS EL MIDDLEWARE PARA VALIDAR EL CORREO VERIFICADO
import { emailIsVerified } from "../middlewares/checkEmailVerified.js";
// IMPORTAMOS LOS VALIDADORES DE DATOS
import { dataConsultant, dataResumeCV } from "../validators/data.validator.js";

// RUTA PARA REGISTRAR LOS DATOS DEL CONSULTOR
router.post(
  "/registerDataConsultant",
  authRequired,
  emailIsVerified,
  validateData(dataConsultant),
  registerDataConsultant
);

// RUTA PARA OBTENER LOS DATOS DEL USUARIO
router.get("/getInformationConsultant", authRequired, getInformationConsultant);

// RUTA PARA CREAR EL RESUMEN DE TU CV
router.post(
  "/createResumeCV",
  authRequired,
  validateData(dataResumeCV),
  createResumeCV
);

// RUTA PARA ACTUALIZAR QUE TIENE UN CV CREADO
router.put("/updateCVIsDone", authRequired, updateCVIsDone);

// RUTA PARA REGISTRAR SUS DATOS BANCARIOS
router.post("/registerDataBank");

// RUTA PARA ACTUALIZAR SUS DATOS BANCARIOS
router.put("/updateDataBank/:id");

// EXPORTAMOS EL ENRUTADOR
export default router;
