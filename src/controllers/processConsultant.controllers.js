// IMPORTAMOS EL MODELO DE LOS DATOS DEL CONSULTOR
import consultantProfileModel from "../models/consultants/consultant.model.js";
// IMPORTAMOS EL MODELO DE CREAR EL RESUMEN CV
import consultantResumeCVModel from "../models/consultants/consultantResumeCV.model.js";
// IMPORTAMOS EL MODELO DE CREAR LA EXPERIENCIA CV
import consultantExperienceCVModel from "../models/consultants/consultantExperienceCV.model.js";
// IMPORTAMOS EL MODELO DE CREAR LOS ESTUDIOS CV
import consultantStudyCVModel from "../models/consultants/consultantStudyCV.model.js";
// IMPORTAMOS EL MODELO DE CREAR LAS AREAS DE ESPECIALIDADES CV
import consultantAreasCVModel from "../models/consultants/consultantAreasCV.model.js";

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
  const userWithResumeFound = await consultantResumeCVModel.findOne({
    ownerID: req.user._id,
  });

  if (!userWithResumeFound) {
    // GUARDAMOS LOS DATOS DEL RESUMEN
    saveResumeCV(req, res);
    // GUARDAMOS LOS DATOS DE LA EXPERIENCIA
    saveExperience(req, res);
    // GUARDAMOS LOS DATOS DE LOS ESTUDIOS
    saveEducation(req, res);
    // GUARDAMOS LOS DATOS DE ESPECIALIDADES
    saveSpecialties(req, res);

    res.status(200).json(["CREADO"]);
  } else {
    res.status(400).json(["EXISTENTE"]);
  }
};
const saveResumeCV = async (req, res) => {
  const { profession, description } = req.body;
  // INSTANCIAS EL ESQUEMA Y LO ALMACENAMOS
  const newResumeCV = new consultantResumeCVModel({
    profession,
    description,
    ownerID: req.user._id,
  });

  try {
    // GUARDAMOS LOS DATOS DEL RESUMEN
    const newResumeCVSaved = await newResumeCV.save();

    // ENVIAMOS LA RESPUESTA
    console.log(newResumeCVSaved);
  } catch (error) {
    res.status(500).json(["ERROR"]);
  }
};
const saveExperience = async (req, res) => {
  const {
    position,
    company,
    resume,
    experienceMonthStart,
    experienceYearStart,
    experienceMonthEnd,
    experienceYearEnd,
  } = req.body;

  const startDate = `${experienceMonthStart} - ${experienceYearStart}`;
  const endDate = `${experienceMonthEnd} - ${experienceYearEnd}`;
  // INSTANCIAS EL ESQUEMA Y LO ALMACENAMOS
  const newExperienceCV = new consultantExperienceCVModel({
    position,
    company,
    resume,
    startDate,
    endDate,
    ownerID: req.user._id,
  });

  try {
    // GUARDAMOS LOS DATOS DEL RESUMEN
    const newExperienceSaved = await newExperienceCV.save();

    console.log(newExperienceSaved);
  } catch (error) {
    res.status(500).json(["ERROR"]);
  }
};
const saveEducation = async (req, res) => {
  const {
    institution,
    educationLevel,
    area,
    studiesMonthStart,
    studiesYearStart,
    studiesMonthEnd,
    studiesYearEnd,
  } = req.body;

  const startDate = `${studiesMonthStart} - ${studiesYearStart}`;
  const endDate = `${studiesMonthEnd} - ${studiesYearEnd}`;

  const newEducationCV = new consultantStudyCVModel({
    institution,
    educationLevel,
    area,
    startDate,
    endDate,
    ownerID: req.user._id,
  });

  try {
    // GUARDAMOS LOS DATOS DEL RESUMEN
    const newEducationSaved = await newEducationCV.save();

    console.log(newEducationSaved);
  } catch (error) {
    res.status(500).json(["ERROR"]);
  }
};
const saveSpecialties = async (req, res) => {
  const { nameArea } = req.body;

  const newAreasCV = new consultantAreasCVModel({
    nameArea,
    ownerID: req.user._id,
  });
  try {
    // GUARDAMOS LOS DATOS DEL RESUMEN
    const newAreasSaved = await newAreasCV.save();

    console.log(newAreasSaved);
  } catch (error) {
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
    console.log(cvIsUpdated);
    res.send(cvIsUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR"]);
  }
};
export const getConsultantCV = async (req, res) => {
  const consultantCV = {};

  try {
    const resumeInformationCV = await getResumeCV(req, res, req.user._id);
    const experienceInformationCV = await getExperienceCV(
      req,
      res,
      req.user._id
    );
    const studiesInformationCV = await getStudiesCV(req, res, req.user._id);
    const areasInformationCV = await getAreasCV(req, res, req.user._id);

    consultantCV.resume = resumeInformationCV;
    consultantCV.experience = experienceInformationCV;
    consultantCV.studies = studiesInformationCV;
    consultantCV.areas = areasInformationCV;

    res.send(consultantCV);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR"]);
  }
};
const getResumeCV = async (req, res, id) => {
  try {
    const resumeCV = await consultantResumeCVModel.findOne({
      ownerID: id,
    });

    return {
      profession: resumeCV.profession,
      description: resumeCV.description,
    };
  } catch (error) {
    return { error: "ERROR RESUME" };
  }
};
const getExperienceCV = async (req, res, id) => {
  try {
    const experienceCV = await consultantExperienceCVModel.findOne({
      ownerID: id,
    });

    return {
      position: experienceCV.position,
      resume: experienceCV.resume,
      company: experienceCV.company,
      startDate: experienceCV.startDate,
      endDate: experienceCV.endDate,
    };
  } catch (error) {
    return { error: "ERROR EXPERIENCE" };
  }
};
const getStudiesCV = async (req, res, id) => {
  try {
    const studiesCV = await consultantStudyCVModel.findOne({
      ownerID: id,
    });

    return {
      institution: studiesCV.institution,
      educationLevel: studiesCV.educationLevel,
      area: studiesCV.area,
      startDate: studiesCV.startDate,
      endDate: studiesCV.endDate,
    };
  } catch (error) {
    return { error: "ERROR STUDIES" };
  }
};
const getAreasCV = async (req, res, id) => {
  try {
    const areasCV = await consultantAreasCVModel.findOne({
      ownerID: id,
    });

    return {
      nameArea: areasCV.nameArea,
    };
  } catch (error) {
    return { error: "ERROR AREAS" };
  }
};
