// IMPORTAMOS JWT
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) {
  // RESOLVE ES POR SI TODO SALE BIEN
  // REJECT ES POR SI OCURRE UN ERROR
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
