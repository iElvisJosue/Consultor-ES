// IMPORTAMOS EL MODEL DEL CLIENTE
import clientProfileModel from "../models/clients/client.model.js";
// IMPORTAMOS EL MODELO DE LOS PROYECTOS DEL CLIENTE
import clientProjectsModel from "../models/clients/clientProjects.model.js";
// IMPORTAMOS EL MODELO DEL CONSULTOR
import consultantProfileModel from "../models/consultants/consultant.model.js";
// IMPORTAMOS EL MODELO DEL RESUMEN DEL CONSULTOR
import consultantResumeModel from "../models/consultants/consultantResume.model.js";
// IMPORTAMOS EL MODELO DE EXPERIENCIA DEL CONSULTOR
import consultantExperienceModel from "../models/consultants/consultantExperience.model.js";
// IMPORTAMOS EL MODELO DE EDUCACIÓN DEL CONSULTOR
import consultantEducationModel from "../models/consultants/consultantEducation.model.js";
// IMPORTAMOS EL MODELO DE LOS CONSULTORES
import consultantAreasModel from "../models/consultants/consultantAreas.model.js";
// IMPORTAMOS EL MODELO DE LOS IDIOMAS DEL CONSULTOR
import consultantLanguagesModel from "../models/consultants/consultantLanguages.model.js";
// IMPORTAMOS EL MODELO DE LAS HABILIDADES DEL CONSULTOR
import consultantSkillsModel from "../models/consultants/consultantSkills.model.js";

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
      businessSector,
      estimatedValue,
      challenges,
      helpMe,
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
        businessSector,
        estimatedValue,
        challenges,
        helpMe,
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
export const getInformationClient = async (req, res) => {
  try {
    const dataClient = await clientProfileModel.findOne({
      ownerID: req.user._id,
    });
    const projectsClient = await clientProjectsModel.find({
      ownerID: req.user._id,
      isDeleted: false,
    });
    const clientFullInformation = {
      dataClient,
      projectsClient,
    };
    res.send(clientFullInformation);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL OBTENER DE LOS DATOS DEL CLIENTE"]);
  }
};
export const addNewProject = async (req, res) => {
  try {
    const { nameProject, detailsProject, timeProject, areaProject } = req.body;

    const projectDetails = {
      nameProject,
      detailsProject,
      timeProject,
      areaProject,
      ownerID: req.user._id,
    };

    const newProject = new clientProjectsModel(projectDetails);

    const projectSaved = await newProject.save();

    res.send(projectSaved);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR EN EL REGISTRO DE LOS DATOS DEL PROYECTO"]);
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { idProject } = req.body;
    await clientProjectsModel.findOneAndUpdate(
      {
        _id: idProject,
      },
      {
        isDeleted: true,
      }
    );
    res.send(["PROYECTO ELIMINADO"]);
  } catch (error) {
    console.log(error);
  }
};
export const completedProject = async (req, res) => {
  try {
    const { idProject } = req.body;
    await clientProjectsModel.findOneAndUpdate(
      {
        _id: idProject,
      },
      {
        isCompleted: true,
      }
    );
    res.send(["PROYECTO COMPLETADO"]);
  } catch (error) {
    console.log(error);
  }
};
export const getConsultantsAvailableForProject = async (req, res) => {
  const projectAreas = Object.values(req.body);
  try {
    const consultantArea = await Promise.all(
      projectAreas.map(async ({ areaProject }) => {
        const result = await consultantAreasModel.find({
          nameArea: areaProject,
        });
        return result;
      })
    );

    const consultantAreaFiltered = consultantArea.flat();
    if (consultantAreaFiltered.length > 0) {
      const consultantInformation = await Promise.all(
        consultantAreaFiltered.map(async ({ ownerID }) => {
          const result = await consultantProfileModel.findOne({
            ownerID: ownerID,
          });
          return result;
        })
      );
      const consultantResume = await Promise.all(
        consultantAreaFiltered.map(async ({ ownerID }) => {
          const result = await consultantResumeModel.findOne({
            ownerID: ownerID,
          });
          return result;
        })
      );
      const consultantExperience = await Promise.all(
        consultantAreaFiltered.map(async ({ ownerID }) => {
          const result = await consultantExperienceModel.find({
            ownerID: ownerID,
          });
          return result;
        })
      );
      const consultantEducation = await Promise.all(
        consultantAreaFiltered.map(async ({ ownerID }) => {
          const result = await consultantEducationModel.find({
            ownerID: ownerID,
          });
          return result;
        })
      );
      const consultantLanguages = await Promise.all(
        consultantAreaFiltered.map(async ({ ownerID }) => {
          const result = await consultantLanguagesModel.find({
            ownerID: ownerID,
          });
          return result;
        })
      );
      const consultantSkills = await Promise.all(
        consultantAreaFiltered.map(async ({ ownerID }) => {
          const result = await consultantSkillsModel.find({
            ownerID: ownerID,
          });
          return result;
        })
      );

      const projectConsultantInformation = {
        consultantInformation,
        consultantResume,
        consultantExperience,
        consultantEducation,
        consultantLanguages,
        consultantSkills,
        areaInformation: consultantAreaFiltered,
      };
      res.send(projectConsultantInformation);
    } else {
      res.send(["NO HAY PROYECTOS"]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL OBTENER LOS PROYECTOS"]);
  }
};
