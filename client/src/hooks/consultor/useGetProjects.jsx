/* eslint-disable react-hooks/exhaustive-deps */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useGetProjects({ consultantAreas }) {
  const { getProjectsAvailable } = useConsultant();
  const [projectsAvailable, setProjectsAvailable] = useState();
  const [checkProjectsAvailable, setCheckProjectsAvailable] = useState(false);
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    async function getProjectsAvailableForConsultant() {
      if (consultantAreas) {
        const data = consultantAreas;
        try {
          const res = await getProjectsAvailable(data);
          if (res.data[0] !== "NO HAY PROYECTOS") {
            setProjectsAvailable(res.data);
          } else {
            setProjectsAvailable(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setSearching(false);
    }
    getProjectsAvailableForConsultant();
  }, [checkProjectsAvailable]);

  return {
    projectsAvailable,
    searching,
    setCheckProjectsAvailable,
    checkProjectsAvailable,
  };
}
