// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useDataLanguage({
  setCheckCV,
  checkCV,
  submitDisabled,
  changeMenu,
  setElementID,
}) {
  const { addLanguage } = useConsultant();
  const addLanguageConsultant = async (data) => {
    submitDisabled();
    try {
      const res = await addLanguage(data);
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
    imgUrl: "./IdiomasPersonales.png",
    imgAlt: "Idiomas Personales",
    title: "Agregar Idioma 🌍",
    changeMenu,
  };

  return {
    addLanguageConsultant,
    backSectionHeaderProps,
  };
}
