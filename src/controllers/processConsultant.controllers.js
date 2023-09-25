// IMPORTAMOS EL MODELO DE LOS DATOS DEL CONSULTOR
import consultantProfileModel from "../models/consultants/consultant.model.js";

export const registerDataConsultant = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR EN REGISTRO DE DATOS DEL CONSULTOR"]);
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
    res.status(500).json(["ERROR AL OBTENER LA INFORMACIÓN DEL CONSULTOR"]);
  }
};
export const createResumeCV = async (req, res) => {
  try {
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

    const keyExperience = `experience${position}On${company}`.replace(
      /\s+/g,
      ""
    );
    const keyEducation = `education${area}On${institution}`.replace(/\s+/g, "");
    const keyArea = `area${nameArea}`.replace(/\s+/g, "");

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
    res.status(500).json(["ERROR AL CREAR EL CV DEL CONSULTOR"]);
  }
};
export const updateResume = async (req, res) => {
  try {
    const { profession, description } = req.body;

    await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        resumeCV: {
          profession: profession,
          description: description,
        },
      }
    );

    res.send(["RESUMEN ACTUALIZADO"]);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(["ERROR AL ACTUALIZAR EL RESUMEN DEL CV DEL CONSULTOR"]);
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
    res.status(500).json(["ERROR AL ACTUALIZAR EL CV DEL CONSULTOR"]);
  }
};
export const addNewExperience = async (req, res) => {
  try {
    const {
      position,
      company,
      resume,
      experienceMonthStart,
      experienceYearStart,
      experienceMonthEnd,
      experienceYearEnd,
    } = req.body;

    const keyExperience = `experience${position}On${company}`.replace(
      /\s+/g,
      ""
    );

    const newExperienceData = {
      _id: keyExperience,
      position: position,
      company: company,
      resume: resume,
      startDate: `${experienceMonthStart} ${experienceYearStart}`,
      endDate: `${experienceMonthEnd} ${experienceYearEnd}`,
    };

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
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR LA EXPERIENCIA"]);
  }
};
export const addNewStudy = async (req, res) => {
  try {
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
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR LA EDUCACIÓN"]);
  }
};
export const addNewArea = async (req, res) => {
  try {
    const { nameArea } = req.body;

    const keyArea = `area${nameArea}`.replace(/\s+/g, "");

    const newAreaData = {
      _id: keyArea,
      nameArea: nameArea,
    };

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
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR LA ÁREA"]);
  }
};
export const addNewLanguage = async (req, res) => {
  try {
    const { nameLanguage, levelLanguage } = req.body;

    const keyLanguage =
      `language${nameLanguage}WithLevel${levelLanguage}`.replace(/\s+/g, "");

    const newLanguageData = {
      _id: keyLanguage,
      nameLanguage: nameLanguage,
      levelLanguage: levelLanguage,
    };

    await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          [`languagesCV.${keyLanguage}`]: newLanguageData,
        },
      }
    );

    res.send(["AGREGADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR EL IDIOMA"]);
  }
};
export const addNewSkill = async (req, res) => {
  try {
    const { nameSkill } = req.body;

    const keySkill = `skill${nameSkill}`.replace(/\s+/g, "");

    const newSkillData = {
      _id: keySkill,
      nameSkill: nameSkill,
    };

    await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          [`skillsCV.${keySkill}`]: newSkillData,
        },
      }
    );

    res.send(["AGREGADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR LA HABILIDAD"]);
  }
};
export const updateExperience = async (req, res) => {
  try {
    const {
      position,
      company,
      resume,
      experienceMonthStart,
      experienceYearStart,
      experienceMonthEnd,
      experienceYearEnd,
      id,
    } = req.body;

    const newExperienceData = {
      _id: id,
      position: position,
      company: company,
      resume: resume,
      startDate: `${experienceMonthStart} ${experienceYearStart}`,
      endDate: `${experienceMonthEnd} ${experienceYearEnd}`,
    };

    const experienceUpdated = await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          [`experienceCV.${id}`]: newExperienceData,
        },
      },
      {
        new: true,
      }
    );

    res.send(experienceUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ACTUALIZAR LA EXPERIENCIA"]);
  }
};
export const updateStudy = async (req, res) => {
  try {
    const {
      institution,
      educationLevel,
      area,
      studiesMonthStart,
      studiesYearStart,
      studiesMonthEnd,
      studiesYearEnd,
      id,
    } = req.body;

    const newStudyData = {
      _id: id,
      institution: institution,
      educationLevel: educationLevel,
      area: area,
      startDate: `${studiesMonthStart} ${studiesYearStart}`,
      endDate: `${studiesMonthEnd} ${studiesYearEnd}`,
    };

    const studyUpdated = await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          [`educationCV.${id}`]: newStudyData,
        },
      },
      {
        new: true,
      }
    );

    res.send(studyUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ACTUALIZAR LA EDUCACIÓN"]);
  }
};
export const deleteExperience = async (req, res) => {
  try {
    const { idExperience } = req.body;
    await consultantProfileModel.updateOne(
      {},
      {
        $unset: {
          [`experienceCV.${idExperience}`]: "",
        },
      }
    );
    res.send(["EXPERIENCIA ELIMINADA"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR LA EXPERIENCIA"]);
  }
};
export const deleteStudy = async (req, res) => {
  try {
    const { idStudy } = req.body;
    await consultantProfileModel.updateOne(
      {},
      {
        $unset: {
          [`educationCV.${idStudy}`]: "",
        },
      }
    );
    res.send(["ESTUDIO ELIMINADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR EL ESTUDIO"]);
  }
};
export const deleteArea = async (req, res) => {
  try {
    const { idArea } = req.body;
    await consultantProfileModel.updateOne(
      {},
      {
        $unset: {
          [`areasCV.${idArea}`]: "",
        },
      }
    );

    res.send(["AREA ELIMINADA"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR EL ESTUDIO"]);
  }
};
export const deleteLanguage = async (req, res) => {
  try {
    const { idLanguage } = req.body;
    await consultantProfileModel.updateOne(
      {},
      {
        $unset: {
          [`languagesCV.${idLanguage}`]: "",
        },
      }
    );
    res.send(["IDIOMA ELIMINADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR EL IDIOMA"]);
  }
};
export const deleteSkill = async (req, res) => {
  try {
    const { idSkill } = req.body;
    await consultantProfileModel.updateOne(
      {},
      {
        $unset: {
          [`skillsCV.${idSkill}`]: "",
        },
      }
    );
    res.send(["HABILIDAD ELIMINADA"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR LA HABILIDAD"]);
  }
};
