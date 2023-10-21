// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useDataArea({
  setCheckCV,
  checkCV,
  submitDisabled,
  changeMenu,
  setElementID,
}) {
  const { addArea } = useConsultant();
  const addAreaConsultant = async (data) => {
    submitDisabled();
    try {
      const res = await addArea(data);
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
    imgUrl: "./EspecialidadPersonal.png",
    imgAlt: "Especialidad Profesional",
    title: "Agregar Especialidad 🛠️",
    changeMenu,
  };

  return {
    addAreaConsultant,
    backSectionHeaderProps,
  };
}
