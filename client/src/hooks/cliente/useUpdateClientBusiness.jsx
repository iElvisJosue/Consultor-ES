// CONTEXTOS A USAR
import { useClient } from "../../context/ClientContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

export default function useUpdateClientBusiness({
  setCheckClient,
  checkClient,
}) {
  const { updateDataBusinessClient } = useClient();
  const updateBusinessClient = async (data) => {
    try {
      const res = await updateDataBusinessClient(data);
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
    updateBusinessClient,
  };
}
