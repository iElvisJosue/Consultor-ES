// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// ALMACENAMOS EL ENRUTADOR
const router = Router();
// IMPORTAMOS LOS CONTROLADORES
import {
  registerDataConsultant,
  registerDataBank,
  getInformationConsultant,
  createResumeCV,
  updateCVIsDone,
  addNewExperience,
  addNewStudy,
  addNewArea,
  addNewLanguage,
  addNewSkill,
  updateResume,
  updateExperience,
  updateStudy,
  deleteExperience,
  deleteStudy,
  deleteArea,
  deleteLanguage,
  deleteSkill,
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

// RUTA PARA ACTUALIZAR EL RESUMEN DEL CV
router.put("/updateResume", authRequired, updateResume);

// RUTA PARA ACTUALIZAR QUE TIENE UN CV CREADO
router.put("/updateCVIsDone", authRequired, updateCVIsDone);

// RUTA PARA AGREGAR UNA NUEVA EXPERIENCIA
router.put("/addNewExperience", authRequired, addNewExperience);

// RUTA PARA ACTUALIZAR UNA EXPERIENCIA
router.put("/updateExperience", authRequired, updateExperience);

// RUTA PARA ELIMINAR UNA EXPERIENCIA
router.put("/deleteExperience", authRequired, deleteExperience);

// RUTA PARA AGREGAR UN NUEVO ESTUDIO
router.put("/addNewStudy", authRequired, addNewStudy);

// RUTA PARA ACTUALIZAR UN ESTUDIO
router.put("/updateStudy", authRequired, updateStudy);

// RUTA PARA ELIMINAR UN ESTUDIO
router.put("/deleteStudy", authRequired, deleteStudy);

// RUTA PARA AGREGAR UNA NUEVA AREA
router.put("/addNewArea", authRequired, addNewArea);

// RUTA PARA ELIMINAR UNA AREA
router.put("/deleteArea", authRequired, deleteArea);

// RUTA PARA AGREGAR UN NUEVO IDIOMA
router.put("/addNewLanguage", authRequired, addNewLanguage);

// RUTA PARA ELIMINAR UN IDIOMA
router.put("/deleteLanguage", authRequired, deleteLanguage);

// RUTA PARA AGREGAR UNA NUEVA SKILL
router.put("/addNewSkill", authRequired, addNewSkill);

// RUTA PARA ELIMINAR UNA SKILL
router.put("/deleteSkill", authRequired, deleteSkill);

// RUTA PARA REGISTRAR SUS DATOS BANCARIOS
router.put("/registerDataBank", authRequired, registerDataBank);

// RUTA PARA ACTUALIZAR SUS DATOS BANCARIOS
router.put("/updateDataBank/");

// EXPORTAMOS EL ENRUTADOR
export default router;
