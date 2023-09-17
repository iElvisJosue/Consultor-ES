// IMPORTAMOS EL MODELO DE LOS DATOS DEL CONSULTOR
import consultantProfileModel from "../models/consultants/consultant.model.js";
// IMPORTAMOS EL MODELO DE LOS USUARIOS
import userModel from "../models/users.model.js";

export const registerDataConsultant = async (req, res) => {
  // TODO: EN EL FRONT AGREGAREMOS LOS TYC
  // OBTENEMOS LOS DATOS A ALMACENAR
  const { name, lastName, motherLastName, RFC, number, LinkedIn } = req.body;

  // VERIFICAMOS SI EXISTEN LOS DATOS ÚNICOS (RFC/USUARIO)
  const RFCFound = await consultantProfileModel.findOne({ RFC });
  const userFound = await consultantProfileModel.findOne({
    ownerID: req.user.id,
  });

  if (!RFCFound) {
    if (!userFound) {
      // INSTANCIAS EL ESQUEMA Y LO ALMACENAMOS
      const newConsultantProfile = new consultantProfileModel({
        name,
        lastName,
        motherLastName,
        RFC,
        number,
        LinkedIn,
        ownerID: req.user.id,
      });

      // LO ALMACENAMOS EN LA BD
      const consultantProfileModelSaved = await newConsultantProfile.save();

      // ELIMINAMOS EL TOKEN
      res.cookie("accessToken", "", {
        expires: new Date(0),
      });

      res.send(consultantProfileModelSaved);
    } else {
      res.status(400).json(["ACTIVO"]);
    }
  } else {
    res.status(400).json(["RFC"]);
  }
};
