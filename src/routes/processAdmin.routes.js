// IMPORTAMOS EL ENRUTADOR
import { Router } from "express";
// ALMACENAMOS EL ENRUTADOR
const router = Router();
// IMPORTAMOS LAS FUNCIONES PARA EL ADMINISTRADOR
import { getUsersAndProjects } from "../controllers/processAdmin.controllers.js";
// IMPORTAMOS EL MIDDLEWARE PARA VERIFICAR QUE TENGAS UN TOKEN DE ACCESO
import { authRequired } from "../middlewares/validateToken.js";
// IMPORTAMOS EL MIDDLEWARE PARA VALIDAR QUE SEA UN ADMINISTRADOR
import { isAdmin } from "../middlewares/checkAdmin.js";

// RUTA PARA OBTENER LOS DATOS DE TODOS LOS USUARIOS
router.get("/getUsersAndProjects", authRequired, isAdmin, getUsersAndProjects);

// EXPORTAMOS EL ENRUTADOR
export default router;
