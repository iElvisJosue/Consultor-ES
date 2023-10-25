// IMPORTAMOS EL MODELO DEL USUARIO
import userModel from "../models/users.model.js";
// IMPORTAMOS EL MODELO DE LOS PROYECTOS
import clientProjectsModel from "../models/clients/clientProjects.model.js";

const error500 =
  "Lo sentimos, se ha producido un error interno en el servidor. Nuestro equipo técnico ha sido notificado y está trabajando para resolverlo lo más rápido posible. Por favor, inténtalo de nuevo más tarde.";

export const getUsersAndProjects = async (req, res) => {
  try {
    const totalConsultantsPromise = userModel.find({
      role: "Consultor",
      userName: { $ne: "" },
    });
    const totalClientsPromise = userModel.find({
      role: "Cliente",
      userName: { $ne: "" },
    });
    const totalAdminsPromise = userModel.find({
      role: "Administrador",
      userName: { $ne: "" },
    });
    const totalProjectsAvailablePromise = clientProjectsModel.find({
      isCompleted: false,
      isDeleted: false,
    });
    const totalProjectsCompletedPromise = clientProjectsModel.find({
      isCompleted: true,
    });
    const totalProjectsDeletedPromise = clientProjectsModel.find({
      isDeleted: true,
    });

    const [
      totalConsultants,
      totalClients,
      totalAdmins,
      totalProjectsAvailable,
      totalProjectsCompleted,
      totalProjectsDeleted,
    ] = await Promise.all([
      totalConsultantsPromise,
      totalClientsPromise,
      totalAdminsPromise,
      totalProjectsAvailablePromise,
      totalProjectsCompletedPromise,
      totalProjectsDeletedPromise,
    ]);

    const totalUsersAndProjects = {
      totalConsultants: totalConsultants.length,
      totalClients: totalClients.length,
      totalAdmins: totalAdmins.length,
      totalProjectsAvailable: totalProjectsAvailable.length,
      totalProjectsCompleted: totalProjectsCompleted.length,
      totalProjectsDeleted: totalProjectsDeleted.length,
    };

    res.send(totalUsersAndProjects);
  } catch (error) {
    console.log(error);
    res.status(500).json(error500);
  }
};
