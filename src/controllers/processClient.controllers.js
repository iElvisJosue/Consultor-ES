// IMPORTAMOS EL MODEL DEL CLIENTE
import clientProfileModel from "../models/clients/client.model.js";

export const registerDataClient = async (req, res) => {
  // TODO: EN EL FRONT AGREGAREMOS LOS TYC
  // OBTENEMOS LOS DATOS A ALMACENAR
  const {
    name,
    lastName,
    motherLastName,
    RFC,
    number,
    businessName,
    serviceArea,
  } = req.body;

  // VERIFICAMOS SI EXISTEN LOS DATOS ÚNICOS (RFC/USUARIO)
  const RFCFound = await clientProfileModel.findOne({ RFC });
  const userFound = await clientProfileModel.findOne({
    ownerID: req.user.id,
  });
  if (!RFCFound) {
    if (!userFound) {
      // INSTANCIAS EL ESQUEMA Y LO ALMACENAMOS
      const newConsultantProfile = new clientProfileModel({
        name,
        lastName,
        motherLastName,
        RFC,
        number,
        businessName,
        serviceArea,
        ownerID: req.user.id,
      });

      // LO ALMACENAMOS EN LA BD
      const clientProfileModelSaved = await newConsultantProfile.save();

      // ELIMINAMOS EL TOKEN
      res.cookie("accessToken", "", {
        expires: new Date(0),
      });

      res.send(clientProfileModelSaved);
    } else {
      res.status(400).json(["ACTIVO"]);
    }
  } else {
    res.status(400).json(["RFC"]);
  }
};
