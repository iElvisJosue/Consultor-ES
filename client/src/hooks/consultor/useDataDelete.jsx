// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

export default function useDataDelete({ setElementID, setCheckCV, checkCV }) {
  const {
    deleteExperience,
    deleteStudy,
    deleteArea,
    deleteLanguage,
    deleteSkill,
  } = useConsultant();

  const handleDelete = async (elementID, deleteSection) => {
    try {
      const res = await deleteSection(elementID);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
      }
      setCheckCV(!checkCV);
      setElementID(null);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  return {
    deleteExperience,
    deleteStudy,
    deleteArea,
    deleteLanguage,
    deleteSkill,
    handleDelete,
  };
}
