import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (accessToken) {
    // VERIFICAMOS QUE EL TOKEN SEA NUESTRO
    jwt.verify(accessToken, TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: "NO TOKEN, ACCESO DENEGADO",
        });
      }
      // DEVOLVEMOS EL TOKEN CON SUS DATOS
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      message: "NO TOKEN, ACCESO DENEGADO",
    });
  }
};
