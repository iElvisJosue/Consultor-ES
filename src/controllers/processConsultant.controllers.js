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

  const keyExperience = `experience${position}On${company}`.replace(/\s+/g, "");
  const keyEducation = `education${area}On${institution}`.replace(/\s+/g, "");
  const keyArea = `area${nameArea}`.replace(/\s+/g, "");

  try {
    await consultantProfileModel.findOneAndUpdate(
      { ownerID: req.user._id },
      {
        resumeCV: {
          profession: profession,
          description: description,
        },
        experienceCV: {
          [keyExperience]: {
            _id: keyExperience,
            position: position,
            company: company,
            resume: resume,
            startDate: `${experienceMonthStart} ${experienceYearStart}`,
            endDate: `${experienceMonthEnd} ${experienceYearEnd}`,
          },
        },
        educationCV: {
          [keyEducation]: {
            _id: keyEducation,
            institution: institution,
            educationLevel: educationLevel,
            area: area,
            startDate: `${studiesMonthStart} ${studiesYearStart}`,
            endDate: `${studiesMonthEnd} ${studiesYearEnd}`,
          },
        },
        areasCV: {
          [keyArea]: {
            _id: keyArea,
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
export const addNewExperience = async (req, res) => {
  const {
    position,
    company,
    resume,
    experienceMonthStart,
    experienceYearStart,
    experienceMonthEnd,
    experienceYearEnd,
  } = req.body;

  const keyExperience = `experience${position}On${company}`.replace(/\s+/g, "");

  const newExperienceData = {
    _id: keyExperience,
    position: position,
    company: company,
    resume: resume,
    startDate: `${experienceMonthStart} ${experienceYearStart}`,
    endDate: `${experienceMonthEnd} ${experienceYearEnd}`,
  };

  try {
    await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          [`experienceCV.${keyExperience}`]: newExperienceData,
        },
      }
    );

    res.send(["AGREGADO"]);
  } catch (error) {
    res.status(500).json(["ERROR"]);
  }
};
export const addNewStudy = async (req, res) => {
  const {
    institution,
    educationLevel,
    area,
    studiesMonthStart,
    studiesYearStart,
    studiesMonthEnd,
    studiesYearEnd,
  } = req.body;

  const keyEducation = `education${area}On${institution}`.replace(/\s+/g, "");

  const newStudyData = {
    _id: keyEducation,
    institution: institution,
    educationLevel: educationLevel,
    area: area,
    startDate: `${studiesMonthStart} ${studiesYearStart}`,
    endDate: `${studiesMonthEnd} ${studiesYearEnd}`,
  };

  try {
    await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          [`educationCV.${keyEducation}`]: newStudyData,
        },
      }
    );

    res.send(["AGREGADO"]);
  } catch (error) {
    res.status(500).json(["ERROR"]);
  }
};
export const addNewArea = async (req, res) => {
  const { nameArea } = req.body;

  const keyArea = `area${nameArea}`.replace(/\s+/g, "");

  const newAreaData = {
    _id: keyArea,
    nameArea: nameArea,
  };

  try {
    await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          [`areasCV.${keyArea}`]: newAreaData,
        },
      }
    );

    res.send(["AGREGADO"]);
  } catch (error) {
    res.status(500).json(["ERROR"]);
  }
};
