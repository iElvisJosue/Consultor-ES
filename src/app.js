// IMPORTAMOS CONFIGURACIÓN DE VARIABLES DE ENTORNO
import "dotenv/config";
// IMPORTAMOS EXPRESS
import express from "express";
// IMPORTAMOS MORGAN
import morgan from "morgan";
// IMPORTAMOS COOKIE PARSER
import cookieParser from "cookie-parser";
// IMPORTAMOS LAS RUTAS PARA EL PROCESO DEL CONSULTOR
import consultantRoutes from "./routes/processConsultant.routes.js";
// IMPORTAMOS LAS RUTAS PARA EL PROCESO DEL CLIENTE
import clientRoutes from "./routes/processClient.routes.js";
// IMPORTAMOS LAS RUTAS PARA PROCESOS GLOBALES
import globalRoutes from "./routes/global.routes.js";
// IMPORTAMOS POLÍTICAS DE CORS
import cors from "cors";

// CREAR SERVIDOR
const app = express();

const allowedOrigins = [
  "https://www.consultor-es.com/",
  "https://consultor-es.vercel.app",
  "http://localhost:5173",
  "https://zx2tvfh9-5173.usw3.devtunnels.ms",
];

// APLICAMOS CORS
app.use(cors({ origin: allowedOrigins, credentials: true }));
// APLICAMOS MORGAN
app.use(morgan("dev"));
// APLICAMOS VISUALIZADO JSON
app.use(express.json());
// APLICAMOS EL VISUALIZADO DE COOKIES
app.use(cookieParser());
// APLICAMOS EL VISUALIZADO DE MULTIMEDIA
// app.use(express.static("public"));

// DEFINIMOS RUTAS PARA CONSULTORES
app.use("/api/consultant", consultantRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/global", globalRoutes);
export default app;
