// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useDataExperience({
  changeMenu,
  setCheckCV,
  checkCV,
  setElementID,
  elementID,
}) {
  const { addExperience, updateExperience } = useConsultant();

  const handleExperience = async (data) => {
    try {
      if (elementID) {
        data.id = elementID;
        const res = await updateExperience(data);
        checkResult(res);
      } else {
        const res = await addExperience(data);
        checkResult(res);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const checkResult = (res) => {
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
  };

  const textButtonExperience = elementID
    ? "Actualizar Experiencia"
    : "Agregar Experiencia";
  const titleExperienceSection = elementID
    ? "Editar Experiencia Profesional 💼"
    : "Agregar Experiencia Profesional 💼";

  const backSectionHeaderProps = {
    imgUrl: "./ExperienciaProfesional.png",
    imgAlt: "Experiencia Profesional",
    title: titleExperienceSection,
    changeMenu,
  };

  return {
    handleExperience,
    backSectionHeaderProps,
    textButtonExperience,
  };
}
