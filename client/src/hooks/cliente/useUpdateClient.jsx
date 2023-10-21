// CONTEXTOS A USAR
import { useClient } from "../../context/ClientContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

export default function useUpdateClient({ setCheckClient, checkClient }) {
  const { updateProfileClient } = useClient();
  const updateClientProfile = async (data) => {
    try {
      const res = await updateProfileClient(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setCheckClient(!checkClient);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return {
    updateClientProfile,
  };
}
