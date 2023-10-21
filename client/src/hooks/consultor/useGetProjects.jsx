/* eslint-disable react-hooks/exhaustive-deps */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useGetProjects({ consultantAreas }) {
  const { getProjectsAvailable } = useConsultant();
  const [projectsAvailable, setProjectsAvailable] = useState();
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    async function getProjectsAvailableForConsultant() {
      if (consultantAreas) {
        const data = consultantAreas;
        const res = await getProjectsAvailable(data);
        if (res.data[0] !== "NO HAY PROYECTOS") {
          setProjectsAvailable(res.data);
        }
      }
      setSearching(false);
    }
    getProjectsAvailableForConsultant();
  }, []);

  return {
    projectsAvailable,
    searching,
  };
}
