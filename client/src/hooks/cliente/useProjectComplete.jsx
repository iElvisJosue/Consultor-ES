// CONTEXTOS A USAR
import { useClient } from "../../context/ClientContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

export default function useProjectComplete({
  setElementID,
  setCheckClient,
  checkClient,
}) {
  const { completedProject } = useClient();

  const completeProject = async (elementID) => {
    try {
      const res = await completedProject({ idProject: elementID });
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
    completeProject,
  };
}
