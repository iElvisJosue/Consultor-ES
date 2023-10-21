// CONTEXTOS A USAR
import { useClient } from "../../context/ClientContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

export default function useProjectDelete({
  setElementID,
  setCheckClient,
  checkClient,
}) {
  const { deleteProject } = useClient();

  const deleteProjectClient = async (elementID) => {
    try {
      const res = await deleteProject({ idProject: elementID });
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
      }
      setCheckClient(!checkClient);
      setElementID(null);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return {
    deleteProjectClient,
  };
}
