/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// CONTEXTOS A USAR
import { useClient } from "../../context/ClientContext";

export default function useGetConsultants({ clientInformation }) {
  const [searching, setSearching] = useState(true);
  const [consultants, setConsultants] = useState(false);
  const { getConsultantsAvailableForProject } = useClient();

  useEffect(() => {
    async function getConsultantsAvailable() {
      const { projectsClient } = clientInformation.data;
      if (projectsClient.length > 0) {
        const allAreas = getProjectAreas(projectsClient);
        try {
          const res = await getConsultantsAvailableForProject(allAreas);
          if (res.data !== "NO HAY PROYECTOS") {
            setConsultants(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setSearching(false);
    }
    getConsultantsAvailable();
  }, []);

  const getProjectAreas = (projectsClient) => {
    const projectArea = [];
    projectsClient.map(({ _id, areaProject, isCompleted, isDeleted }) => {
      if (!isDeleted && !isCompleted) {
        return projectArea.push({ _id, areaProject });
      }
    });
    return projectArea;
  };

  return {
    searching,
    consultants,
  };
}
