// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// ALMACENAMOS EL ENRUTADOR
const router = Router();
// IMPORTAMOS LOS CONTROLADORES
import { sendEmailVerificationCode } from "../controllers/global.controllers.js";
// IMPORTAMOS LA FUNCIÓN QUE ALMACENA LA INFORMACIÓN DEL CLIENTE
import {
  registerDataClient,
  getInformationClient,
  updateDataClient,
  updateImageClient,
  getConsultantsAvailableForProject,
  addNewProject,
  updateProject,
  deleteProject,
  completedProject,
  updateDataBusinessClient,
} from "../controllers/processClient.controllers.js";
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
// IMPORTAMOS MULTER
import multer from "multer";
const upload = multer({ dest: "../public/usersPictures" });

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

// RUTA PARA ACTUALIZAR LOS DATOS DEL CLIENTE
router.put(
  "/updateDataClient",
  authRequired,
  emailIsVerified,
  updateDataClient
);

// RUTA PARA ACTUALIZAR LOS DATOS DE NEGOCIOS DE EL CLIENTE
router.put(
  "/updateDataBusinessClient",
  authRequired,
  emailIsVerified,
  updateDataBusinessClient
);

// RUTA PARA OBTENER LOS CONSULTORES DISPONIBLES PARA UN PROYECTO
router.post(
  "/getConsultantsAvailableForProject",
  authRequired,
  getConsultantsAvailableForProject
);

// RUTA PARA ACTUALIZAR LA IMAGEN DE PERFIL DEL CLIENTE
router.post(
  "/updateImageClient",
  authRequired,
  upload.single("userPicture"),
  updateImageClient
);

// RUTA PARA OBTENER LOS DATOS DEL CLIENTE
router.get("/getInformationClient", authRequired, getInformationClient);

// RUTA PARA AGREGAR UN NUEVO PROYECTO
router.post("/addNewProject", authRequired, addNewProject);

// RUTA PARA ACTUALIZAR UN PROYECTO
router.put("/updateProject", authRequired, updateProject);

// RUTA PARA ELIMINAR UN PROYECTO
router.put("/deleteProject", authRequired, deleteProject);

// RUTA PARA COMPLETAR UN PROYECTO
router.put("/completedProject", authRequired, completedProject);

// RUTA PARA REGISTRAR SUS DATOS BANCARIOS
router.post("/registerNeedsForm", (req, res) => {});

// EXPORTAMOS EL ENRUTADOR
export default router;
