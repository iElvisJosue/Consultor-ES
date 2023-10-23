// IMPORTAMOS EL MODELOS DE LOS USUARIOS
import userModel from "../models/users.model.js";
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
const error500 =
  "Lo sentimos, se ha producido un error interno en el servidor. Nuestro equipo técnico ha sido notificado y está trabajando para resolverlo lo más rápido posible. Por favor, inténtalo de nuevo más tarde.";

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
      res
        .status(400)
        .json(
          "Este correo ya tiene una cuenta activa, por favor inicie sesión."
        );
    }
  } catch (error) {
    res.status(500).json(error500);
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
export const updateDataConsultant = async (req, res) => {
  try {
    const { name, lastName, motherLastName, number, LinkedIn } = req.body;

    await consultantProfileModel.updateOne(
      { ownerID: req.user._id },
      {
        $set: {
          name: name,
          lastName: lastName,
          motherLastName: motherLastName,
          number: number,
          LinkedIn: LinkedIn,
        },
      }
    );

    res.send("Tu información personal ha sido actualizada correctamente.");
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const updateImageConsultant = async (req, res) => {
  try {
    await consultantProfileModel.findOneAndUpdate(
      { ownerID: req.user._id },
      {
        picture: req.file.originalname,
      },
      {
        new: true,
      }
    );

    res.status(200).json("¡Tu imagen ha sido actualizada exitosamente!");
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const getProjectsAvailableConsultant = async (req, res) => {
  const dataAreas = Object.values(req.body);

  try {
    const projectInformationUnfiltered = await Promise.all(
      dataAreas.map(async ({ nameArea }) => {
        const result = await clientProjectsModel
          .find({
            areaProject: nameArea,
            isDeleted: false,
            isCompleted: false,
          })
          .select(
            "_id nameProject detailsProject areaProject timeProject paymentProject ownerID"
          );
        return result;
      })
    );
    const projectInformation = projectInformationUnfiltered.flat();
    if (projectInformation.length > 0) {
      const allProjectInformation = await Promise.all(
        projectInformation.map(async ({ ownerID }, index) => {
          const resultClientInformation = await clientProfileModel
            .findOne({
              ownerID: ownerID,
            })
            .select("name lastName picture motherLastName number");
          const resultUserInformation = await userModel
            .findOne({
              _id: ownerID,
            })
            .select("email");
          return {
            idProject: projectInformation[index]._id,
            nameProject: projectInformation[index].nameProject,
            detailsProject: projectInformation[index].detailsProject,
            timeProject: projectInformation[index].timeProject,
            areaProject: projectInformation[index].areaProject,
            paymentProject: projectInformation[index].paymentProject,
            nameClient: resultClientInformation.name,
            lastNameClient: resultClientInformation.lastName,
            pictureClient: resultClientInformation.picture,
            motherLastNameClient: resultClientInformation.motherLastName,
            emailClient: resultUserInformation.email,
          };
        })
      );
      res.send(allProjectInformation);
    } else {
      res.send(["NO HAY PROYECTOS"]);
    }
  } catch (error) {
    res.status(500).json(error500);
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

    await updateCVIsDone(req, res);

    res
      .status(200)
      .json(
        "Felicidades, tu CV ha sido creado exitosamente. Ahora puedes acceder y editar tu currículum en cualquier momento. Siéntete libre de explorar todas las opciones disponibles para personalizar tu perfil."
      );
  } catch (error) {
    res.status(500).json(error500);
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

    res.send("El resumen de tu CV ha sido actualizado correctamente.");
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const updateCVIsDone = async (req, res) => {
  await consultantProfileModel.updateOne(
    { ownerID: req.user._id },
    { $set: { cvIsDone: true } },
    {
      new: true,
    }
  );
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

    res.send("¡La experiencia ha sido agregada correctamente a tu CV!");
  } catch (error) {
    res.status(500).json(error500);
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

    res.send(
      "¡La experiencia seleccionada, ha sido actualizada correctamente en tu CV!"
    );
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const deleteExperience = async (req, res) => {
  try {
    await consultantExperienceModel.deleteOne({
      _id: req.params.id,
    });
    res.send(
      "¡La experiencia seleccionada, ha sido eliminada correctamente de tu CV!"
    );
  } catch (error) {
    res.status(500).json(error500);
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

    res.send("¡La educación ha sido agregada correctamente a tu CV!");
  } catch (error) {
    res.status(500).json(error500);
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

    res.send(
      "¡La educación seleccionada, ha sido actualizada correctamente en tu CV!"
    );
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const deleteStudy = async (req, res) => {
  try {
    await consultantEducationModel.deleteOne({
      _id: req.params.id,
    });
    res.send(
      "¡La educación seleccionada, ha sido eliminada correctamente de tu CV!"
    );
  } catch (error) {
    console.log(error);
    res.status(500).json(error500);
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
      res.send("¡El área seleccionada ha sido agregada correctamente a tu CV!");
    } else {
      res
        .status(302)
        .json(
          "¡El área seleccionada ya existe en tu CV! Por favor, selecciona una diferente."
        );
    }
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const deleteArea = async (req, res) => {
  try {
    await consultantAreasModel.deleteOne({
      _id: req.params.id,
    });
    res.send(
      "¡La área seleccionada, ha sido eliminada correctamente de tu CV!"
    );
  } catch (error) {
    res.status(500).json(error500);
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

      res.send(
        "¡El idioma seleccionado ha sido agregado correctamente a tu CV!"
      );
    } else {
      res
        .status(302)
        .json(
          "¡El idioma seleccionado ya existe en tu CV! Por favor, selecciona uno diferente."
        );
    }
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const deleteLanguage = async (req, res) => {
  try {
    await consultantLanguagesModel.deleteOne({
      _id: req.params.id,
    });
    res.send(
      "¡El idioma seleccionado, ha sido eliminado correctamente de tu CV!"
    );
  } catch (error) {
    res.status(500).json(error500);
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

      res.send(
        "¡La habilidad introducida ha sido agregada correctamente a tu CV!"
      );
    } else {
      res
        .status(302)
        .json(
          "¡La habilidad introducida ya existe en tu CV! Por favor, ingresa una diferente."
        );
    }
  } catch (error) {
    res.status(500).json(error500);
  }
};
export const deleteSkill = async (req, res) => {
  try {
    await consultantSkillsModel.deleteOne({
      _id: req.params.id,
    });
    res.send(
      "¡La habilidad seleccionada, ha sido eliminada correctamente de tu CV!"
    );
  } catch (error) {
    res.status(500).json(error500);
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

    res.send(
      "Te confirmamos que la información bancaria que proporcionaste ha sido agregada de manera exitosa a tu perfil. Siempre puedes gestionar tu información financiera en está sección."
    );
  } catch (error) {
    res.status(500).json(error500);
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

    res.send("Tu información bancaria ha sido actualizada correctamente.");
  } catch (error) {
    res.status(500).json(error500);
  }
};
