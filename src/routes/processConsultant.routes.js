// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// ALMACENAMOS EL ENRUTADOR
const router = Router();
// IMPORTAMOS LOS CONTROLADORES
import {
  getInformationConsultant,
  getProjectsAvailableConsultant,
  registerDataConsultant,
  updateImageConsultant,
  updateDataConsultant,
  registerDataBank,
  createResumeCV,
  updateCVIsDone,
  updateDataBank,
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
// IMPORTAMOS MULTER
import multer from "multer";
const upload = multer({ dest: "../public/usersPictures" });

// RUTA PARA REGISTRAR LOS DATOS DEL CONSULTOR
router.post(
  "/registerDataConsultant",
  authRequired,
  emailIsVerified,
  validateData(dataConsultant),
  registerDataConsultant
);

// RUTA PARA ACTUALIZAR LOS DATOS DEL CONSULTOR
router.put(
  "/updateDataConsultant",
  authRequired,
  emailIsVerified,
  validateData(dataConsultant),
  updateDataConsultant
);

// RUTA PARA OBTENER LOS DATOS DEL USUARIO
router.get("/getInformationConsultant", authRequired, getInformationConsultant);

// RUTA PARA ACTUALIZAR LA IMAGEN DE PERFIL DEL CONSULTOR
router.post(
  "/updateImageConsultant",
  authRequired,
  upload.single("userPicture"),
  updateImageConsultant
);

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
router.post("/addNewExperience", authRequired, addNewExperience);

// RUTA PARA ACTUALIZAR UNA EXPERIENCIA
router.put("/updateExperience", authRequired, updateExperience);

// RUTA PARA ELIMINAR UNA EXPERIENCIA
router.delete("/deleteExperience/:id", authRequired, deleteExperience);

// RUTA PARA AGREGAR UN NUEVO ESTUDIO
router.post("/addNewStudy", authRequired, addNewStudy);

// RUTA PARA ACTUALIZAR UN ESTUDIO
router.put("/updateStudy", authRequired, updateStudy);

// RUTA PARA ELIMINAR UN ESTUDIO
router.delete("/deleteStudy/:id", authRequired, deleteStudy);

// RUTA PARA AGREGAR UNA NUEVA AREA
router.post("/addNewArea", authRequired, addNewArea);

// RUTA PARA ELIMINAR UNA AREA
router.delete("/deleteArea/:id", authRequired, deleteArea);

// RUTA PARA AGREGAR UN NUEVO IDIOMA
router.post("/addNewLanguage", authRequired, addNewLanguage);

// RUTA PARA ELIMINAR UN IDIOMA
router.delete("/deleteLanguage/:id", authRequired, deleteLanguage);

// RUTA PARA AGREGAR UNA NUEVA SKILL
router.post("/addNewSkill", authRequired, addNewSkill);

// RUTA PARA ELIMINAR UNA SKILL
router.delete("/deleteSkill/:id", authRequired, deleteSkill);

// RUTA PARA REGISTRAR SUS DATOS BANCARIOS
router.post("/registerDataBank", authRequired, registerDataBank);

// RUTA PARA ACTUALIZAR SUS DATOS BANCARIOS
router.put("/updateDataBank", authRequired, updateDataBank);

// RUTA PARA OBTENER LOS PROYECTOS DISPONIBLES PARA EL CONSULTOR
router.post(
  "/getProjectsAvailableConsultant",
  authRequired,
  getProjectsAvailableConsultant
);

// EXPORTAMOS EL ENRUTADOR
export default router;
