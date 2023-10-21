/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// CONTEXTOS A USAR
import { useClient } from "../../context/ClientContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

export default function useUpdateProject({
  elementID,
  changeMenu,
  setCheckClient,
  checkClient,
}) {
  const { updateProject } = useClient();

  const editClientProject = async (dataProject) => {
    try {
      dataProject._id = elementID;
      const res = await updateProject(dataProject);
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
    editClientProject,
  };
}
