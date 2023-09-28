// IMPORTAMOS EL MODEL DEL CLIENTE
import clientProfileModel from "../models/clients/client.model.js";
// IMPORTAMOS EL MODELO DE LOS PROYECTOS DEL CLIENTE
import clientProjectsModel from "../models/clients/clientProjects.model.js";
// IMPORTAMOS EL MODELO DE LOS CONSULTORES
import consultantAreasModel from "../models/consultants/consultantAreas.model.js";

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
    const results = await Promise.all(
      projectAreas.map(async ({ areaProject }) => {
        const result = await consultantAreasModel.aggregate([
          {
            $match: {
              nameArea: areaProject,
            },
          },
          {
            $lookup: {
              from: "consultantProfile",
              localField: "ownerID",
              foreignField: "ownerID",
              as: "consultantOwner",
            },
          },
          {
            $project: {
              nameArea: 1,
              ownerName: "$consultantOwner.name",
              ownerLastName: "$consultantOwner.lastName",
              ownerMotherLastName: "$consultantOwner.motherLastName",
              ownerNumber: "$consultantOwner.number",
              ownerEducation: "$consultantOwner.educationCV",
              ownerExperience: "$consultantOwner.experienceCV",
              ownerResume: "$consultantOwner.resumeCV",
              ownerLanguages: "$consultantOwner.languagesCV",
              ownerSkills: "$consultantOwner.skillsCV",
              ownerLinkedIn: "$consultantOwner.LinkedIn",
            },
          },
        ]);
        return result;
      })
    );
    res.send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(["ERROR AL OBTENER LOS PROYECTOS"]);
  }
};
