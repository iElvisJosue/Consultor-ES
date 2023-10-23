// IMPORTAMOS MULTER
import multer from "multer";
// CONFIGURAMOS EL PATH
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  // RUTA PARA PRUEBA EN PRODUCCIÓN
  destination: path.join(__dirname, "../../client/public/usersPictures"),
  // RUTA ORIGINAL
  // destination: path.join(__dirname, "../public/usersPictures"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const multerConfig = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    const fileType = /png|jpg|jpeg/;
    const mimeType = fileType.test(file.mimetype);
    const extType = fileType.test(path.extname(file.originalname));
    if (mimeType && extType) {
      return cb(null, true);
    }
  },
}).single("userPicture");
