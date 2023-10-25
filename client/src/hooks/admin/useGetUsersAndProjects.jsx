/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
// CONTEXTOS A USAR
import { useAdmin } from "../../context/AdminContext";

export default function useGetUsersAndProjects() {
  const [totalUsersProjects, setTotalUsersProjects] = useState(false);
  const [checkUsersProjects, setUsersProjects] = useState(false);

  const { getUsersAndProjects } = useAdmin();

  useEffect(() => {
    async function getUsersAndProjectsInformation() {
      try {
        const res = await getUsersAndProjects();
        const totalUsersAndProjects = {
          totalUsers: [
            { name: "Administradores", value: res.data.totalAdmins },
            { name: "Clientes", value: res.data.totalClients },
            { name: "Consultores", value: res.data.totalConsultants },
          ],
          totalProjects: [
            {
              name: "Activos/Disponibles",
              value: res.data.totalProjectsAvailable,
            },
            { name: "Completados", value: res.data.totalProjectsCompleted },
            { name: "Eliminados", value: res.data.totalProjectsDeleted },
          ],
        };
        setTotalUsersProjects(totalUsersAndProjects);
      } catch (error) {
        console.log(error);
      }
    }
    getUsersAndProjectsInformation();
  }, [checkUsersProjects]);

  const colorsGraph = {
    usersColors: ["#408a15", "#5f366e", "#ffa30c"],
    projectsColors: ["#ffa30c", "#408a15", "#ff5f56"],
  };

  return {
    totalUsersProjects,
    colorsGraph,
    setUsersProjects,
    checkUsersProjects,
  };
}
