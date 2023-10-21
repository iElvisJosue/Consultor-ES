// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

export default function useUpdateConsultant({ setCheckCV, checkCV }) {
  const { updateProfileConsultant } = useConsultant();
  const updateConsultantProfile = async (data) => {
    try {
      const res = await updateProfileConsultant(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setCheckCV(!checkCV);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return {
    updateConsultantProfile,
  };
}
