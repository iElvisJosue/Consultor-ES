// IMPORTAMOS EL MODEL DEL CLIENTE
import clientProfileModel from "../models/clients/client.model.js";

export const registerDataClient = async (req, res) => {
  try {
    // OBTENEMOS LOS DATOS A ALMACENAR
    const {
      name,
      lastName,
      motherLastName,
      number,
      businessName,
      serviceArea,
    } = req.body;

    // VERIFICAMOS SI EXISTE EL USUARIO
    const userFound = await clientProfileModel.findOne({
      ownerID: req.user._id,
    });
    if (!userFound) {
      // INSTANCIAS EL ESQUEMA Y LO ALMACENAMOS
      const newConsultantProfile = new clientProfileModel({
        name,
        lastName,
        motherLastName,
        number,
        businessName,
        serviceArea,
        ownerID: req.user._id,
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
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR EN EL REGISTRO DE LOS DATOS DEL CLIENTE"]);
  }
};
