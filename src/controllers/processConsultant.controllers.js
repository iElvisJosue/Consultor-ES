// IMPORTAMOS EL MODELO DE LOS DATOS DEL CONSULTOR
import consultantProfileModel from "../models/consultants/consultant.model.js";
// IMPORTAMOS EL MODELO DEL RESUMEN DE CV
import consultantResumeModel from "../models/consultants/consultantResume.model.js";
// IMPORTAMOS EL MODELO DE LA EXPERIENCIA
import consultantExperienceModel from "../models/consultants/consultantExperience.model.js";
// IMPORTAMOS EL MODELO DE LOS ESTUDIOS
import consultantEducationModel from "../models/consultants/consultantEducation.model.js";
// IMPORTAMOS EL MODELO DE LAS AREAS
import consultantAreasModel from "../models/consultants/consultantAreas.model.js";
// IMPORTAMOS EL MODELO DE LOS LENGUAJES
import consultantLanguagesModel from "../models/consultants/consultantLanguages.model.js";
// IMPORTAMOS EL MODELO DE LOS SKILLS
import consultantSkillsModel from "../models/consultants/consultantSkills.model.js";
// IMPORTAMOS EL MODELO DEL BANCO
import consultantBankModel from "../models/consultants/consultantBank.model.js";
// IMPORTAMOS EL MODELO DE LOS PROYECTOS DEL CLIENTE
import clientProjectsModel from "../models/clients/clientProjects.model.js";
// IMPORTAMOS EL MODELO DEL CLIENTE
import clientProfileModel from "../models/clients/client.model.js";

export const registerDataConsultant = async (req, res) => {
  try {
    // OBTENEMOS LOS DATOS A ALMACENAR
    const { name, lastName, motherLastName, number, LinkedIn } = req.body;

    // VERIFICAMOS SI EXISTE EL USUARIO
    const userFound = await consultantProfileModel.findOne({
      ownerID: req.user._id,
    });

    if (!userFound) {
      // INSTANCIAS EL ESQUEMA Y LO ALMACENAMOS
      const newConsultantProfile = new consultantProfileModel({
        name,
        lastName,
        motherLastName,
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

    const consultantResume = await consultantResumeModel.findOne({
      ownerID: req.user._id,
    });

    const consultantExperience = await consultantExperienceModel.find({
      ownerID: req.user._id,
    });

    const consultantEducation = await consultantEducationModel.find({
      ownerID: req.user._id,
    });

    const consultantAreas = await consultantAreasModel.find({
      ownerID: req.user._id,
    });

    const consultantLanguages = await consultantLanguagesModel.find({
      ownerID: req.user._id,
    });

    const consultantSkills = await consultantSkillsModel.find({
      ownerID: req.user._id,
    });

    const consultantBank = await consultantBankModel.findOne({
      ownerID: req.user._id,
    });

    const consultantFullInformation = {
      consultantInformation,
      consultantResume,
      consultantExperience,
      consultantEducation,
      consultantAreas,
      consultantLanguages,
      consultantSkills,
      consultantBank,
    };

    res.send(consultantFullInformation);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL OBTENER LA INFORMACIÓN DEL CONSULTOR"]);
  }
};
export const getProjectsAvailableConsultant = async (req, res) => {
  const dataAreas = Object.values(req.body);

  try {
    const projectInformation = await Promise.all(
      dataAreas.map(async ({ nameArea }) => {
        const result = await clientProjectsModel.find({
          areaProject: nameArea,
          isDeleted: false,
          isCompleted: false,
        });
        return result;
      })
    );
    const projectInformationFiltered = projectInformation.flat();
    if (projectInformationFiltered.length > 0) {
      const clientInformation = await Promise.all(
        projectInformationFiltered.map(async ({ ownerID }) => {
          const result = await clientProfileModel.findOne({
            ownerID: ownerID,
          });
          return result;
        })
      );
      const projectClientInformation = {
        clientInformation,
        projectInformation: projectInformationFiltered,
      };
      res.send(projectClientInformation);
    } else {
      res.send(["NO HAY PROYECTOS"]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL OBTENER LOS PROYECTOS"]);
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

    const resumeAdded = new consultantResumeModel({
      profession,
      description,
      ownerID: req.user._id,
    });

    await resumeAdded.save();

    const experienceAdded = new consultantExperienceModel({
      position,
      company,
      resume,
      startDate: `${experienceMonthStart} ${experienceYearStart}`,
      endDate: `${experienceMonthEnd} ${experienceYearEnd}`,
      ownerID: req.user._id,
    });

    await experienceAdded.save();

    const educationAdded = new consultantEducationModel({
      institution,
      educationLevel,
      area,
      startDate: `${studiesMonthStart} ${studiesYearStart}`,
      endDate: `${studiesMonthEnd} ${studiesYearEnd}`,
      ownerID: req.user._id,
    });

    await educationAdded.save();

    const areaAdded = new consultantAreasModel({
      nameArea,
      ownerID: req.user._id,
    });

    await areaAdded.save();

    res.status(200).json(["CREADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL CREAR EL CV DEL CONSULTOR"]);
  }
};
export const updateResume = async (req, res) => {
  try {
    const { profession, description } = req.body;

    await consultantResumeModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          profession: profession,
          description: description,
        },
      }
    );

    res.send(["ACTUALIZADO"]);
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
export const updateDataBank = async (req, res) => {
  try {
    const { account, bank, name, RFC, country, address } = req.body;

    const dataBank = {
      account: account,
      bank: bank,
      name: name,
      RFC: RFC,
      country: country,
      address: address,
    };

    await consultantBankModel.updateOne({ ownerID: req.user._id }, dataBank);

    res.send(["BANCO ACTUALIZADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ACTUALIZAR LOS DATOS DEL BANCO"]);
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

    const newExperienceData = {
      position: position,
      company: company,
      resume: resume,
      startDate: `${experienceMonthStart} ${experienceYearStart}`,
      endDate: `${experienceMonthEnd} ${experienceYearEnd}`,
      ownerID: req.user._id,
    };

    const experienceAdded = new consultantExperienceModel(newExperienceData);

    await experienceAdded.save();

    res.send(["AGREGADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR LA EXPERIENCIA"]);
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
      position: position,
      company: company,
      resume: resume,
      startDate: `${experienceMonthStart} ${experienceYearStart}`,
      endDate: `${experienceMonthEnd} ${experienceYearEnd}`,
    };

    await consultantExperienceModel.updateOne(
      { _id: id },
      {
        $set: newExperienceData,
      }
    );

    res.send(["ACTUALIZADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ACTUALIZAR LA EXPERIENCIA"]);
  }
};
export const deleteExperience = async (req, res) => {
  try {
    await consultantExperienceModel.deleteOne({
      _id: req.params.id,
    });
    res.send(["EXPERIENCIA ELIMINADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR LA EXPERIENCIA"]);
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

    const newStudyData = {
      institution: institution,
      educationLevel: educationLevel,
      area: area,
      startDate: `${studiesMonthStart} ${studiesYearStart}`,
      endDate: `${studiesMonthEnd} ${studiesYearEnd}`,
      ownerID: req.user._id,
    };

    const studyAdded = new consultantEducationModel(newStudyData);

    await studyAdded.save();

    res.send(["AGREGADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR LA EDUCACIÓN"]);
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

    const newEducationData = {
      institution: institution,
      educationLevel: educationLevel,
      area: area,
      startDate: `${studiesMonthStart} ${studiesYearStart}`,
      endDate: `${studiesMonthEnd} ${studiesYearEnd}`,
    };

    await consultantEducationModel.updateOne(
      { _id: id },
      {
        $set: newEducationData,
      }
    );

    res.send(["ACTUALIZADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ACTUALIZAR LA EXPERIENCIA"]);
  }
};
export const deleteStudy = async (req, res) => {
  try {
    await consultantEducationModel.deleteOne({
      _id: req.params.id,
    });
    res.send(["EDUCACIÓN ELIMINADA"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR LA EDUCACIÓN"]);
  }
};
export const addNewArea = async (req, res) => {
  try {
    const { nameArea } = req.body;

    const areaExists = await consultantAreasModel.findOne({
      nameArea: nameArea,
      ownerID: req.user._id,
    });

    if (!areaExists) {
      const newArea = new consultantAreasModel({
        nameArea: nameArea,
        ownerID: req.user._id,
      });

      await newArea.save();
      res.send(["AGREGADO"]);
    } else {
      res.send(["EXISTENTE"]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR"]);
  }
};
export const deleteArea = async (req, res) => {
  try {
    await consultantAreasModel.deleteOne({
      _id: req.params.id,
    });
    res.send(["AREA ELIMINADA"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR EL AREA"]);
  }
};
export const addNewLanguage = async (req, res) => {
  try {
    const { nameLanguage, levelLanguage } = req.body;

    const hasThisLanguage = await consultantLanguagesModel.findOne({
      nameLanguage: nameLanguage,
      ownerID: req.user._id,
    });
    if (!hasThisLanguage) {
      const languageAdded = new consultantLanguagesModel({
        nameLanguage: nameLanguage,
        levelLanguage: levelLanguage,
        ownerID: req.user._id,
      });

      await languageAdded.save();

      res.send(["AGREGADO"]);
    } else {
      res.send(["EXISTENTE"]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR EL IDIOMA"]);
  }
};
export const deleteLanguage = async (req, res) => {
  try {
    await consultantLanguagesModel.deleteOne({
      _id: req.params.id,
    });
    res.send(["IDIOMA ELIMINADO"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR EL IDIOMA"]);
  }
};
export const addNewSkill = async (req, res) => {
  try {
    const { nameSkill } = req.body;

    const hasThisSkill = await consultantSkillsModel.findOne({
      nameSkill: nameSkill,
      ownerID: req.user._id,
    });
    if (!hasThisSkill) {
      const skillAdded = new consultantSkillsModel({
        nameSkill: nameSkill,
        ownerID: req.user._id,
      });

      await skillAdded.save();

      res.send(["AGREGADO"]);
    } else {
      res.send(["EXISTENTE"]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL AGREGAR LA SKILL"]);
  }
};
export const deleteSkill = async (req, res) => {
  console.log(req.params.id);
  try {
    await consultantSkillsModel.deleteOne({
      _id: req.params.id,
    });
    res.send(["SKILL ELIMINADA"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL ELIMINAR LA SKILL"]);
  }
};
export const registerDataBank = async (req, res) => {
  try {
    const { account, bank, name, RFC, country, address } = req.body;

    const dataBank = {
      account: account,
      bank: bank,
      name: name,
      RFC: RFC,
      country: country,
      address: address,
      ownerID: req.user._id,
    };

    const dataBankAdded = new consultantBankModel(dataBank);

    await dataBankAdded.save();

    res.send(["INFORMACIÓN DEL BANCO AGREGADA"]);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL REGISTRAR DATOS DEL CONSULTOR"]);
  }
};
