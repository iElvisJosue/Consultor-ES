// IMPORTAMOS EL MODELO DE LOS DATOS DEL CONSULTOR
import consultantProfileModel from "../models/consultants/consultant.model.js";

export const registerDataConsultant = async (req, res) => {
  // TODO: EN EL FRONT AGREGAREMOS LOS TYC
  // OBTENEMOS LOS DATOS A ALMACENAR
  const { name, lastName, motherLastName, RFC, number, LinkedIn } = req.body;

  // VERIFICAMOS SI EXISTEN LOS DATOS ÚNICOS (RFC/USUARIO)
  const RFCFound = await consultantProfileModel.findOne({ RFC });
  const userFound = await consultantProfileModel.findOne({
    ownerID: req.user._id,
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
        ownerID: req.user._id,
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
export const getInformationConsultant = async (req, res) => {
  try {
    const consultantInformation = await consultantProfileModel.findOne({
      ownerID: req.user._id,
    });

    res.send(consultantInformation);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR"]);
  }
};
export const createResumeCV = async (req, res) => {
  const {
    profession,
    description,
    position,
    company,
    resume,
    experienceMonthStart,
    experienceYearStart,
    experienceMonthEnd,
    experienceYearEnd,
    institution,
    educationLevel,
    area,
    studiesMonthStart,
    studiesYearStart,
    studiesMonthEnd,
    studiesYearEnd,
    nameArea,
  } = req.body;

  try {
    await consultantProfileModel.findOneAndUpdate(
      { ownerID: req.user._id },
      {
        resumeCV: {
          profession: profession,
          description: description,
        },
        experienceCV: {
          experience1: {
            position: position,
            company: company,
            resume: resume,
            startDate: `${studiesMonthStart} ${studiesYearStart}`,
            endDate: `${studiesMonthEnd} ${studiesYearEnd}`,
          },
        },
        educationCV: {
          institution: institution,
          educationLevel: educationLevel,
          area: area,
          startDate: `${experienceMonthStart} ${experienceYearStart}`,
          endDate: `${experienceMonthEnd} ${experienceYearEnd}`,
        },
        areasCV: {
          area1: {
            nameArea: nameArea,
          },
        },
      }
    );
    res.status(200).json(["CREADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR"]);
  }
};
export const updateCVIsDone = async (req, res) => {
  try {
    const cvIsUpdated = await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      { $set: { cvIsDone: true } },
      {
        new: true,
      }
    );
    res.send(cvIsUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR"]);
  }
};
