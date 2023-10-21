// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useDataResume({
  changeMenu,
  setCheckCV,
  checkCV,
  setElementID,
}) {
  const { updateResume } = useConsultant();

  const updateResumeConsultant = async (data) => {
    try {
      const res = await updateResume(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setCheckCV(!checkCV);
        changeMenu("CV");
        setElementID(null);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const backSectionHeaderProps = {
    imgUrl: "./ResumenProfesional.png",
    imgAlt: "Resumen Profesional",
    title: "Editar Resumen Profesional 📑",
    changeMenu,
  };

  return {
    updateResumeConsultant,
    backSectionHeaderProps,
  };
}
