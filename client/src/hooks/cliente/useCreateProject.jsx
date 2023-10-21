/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// CONTEXTOS A USAR
import { useClient } from "../../context/ClientContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

export default function useCreateProject({
  changeMenu,
  setCheckClient,
  checkClient,
}) {
  const { addProject } = useClient();

  const addNewProject = async (dataProject) => {
    try {
      const res = await addProject(dataProject);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setCheckClient(!checkClient);
      changeMenu("Proyectos");
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return {
    addNewProject,
  };
}
