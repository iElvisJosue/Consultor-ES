// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useDataEducation({
  changeMenu,
  setCheckCV,
  checkCV,
  setElementID,
  elementID,
}) {
  const { addStudy, updateEducation } = useConsultant();

  const handleEducation = async (data) => {
    try {
      if (elementID) {
        data.id = elementID;
        const res = await updateEducation(data);
        checkResult(res);
      } else {
        const res = await addStudy(data);
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

  const textButtonEducation = elementID
    ? "Actualizar Educación"
    : "Agregar Educación";
  const titleEducationSection = elementID
    ? "Editar Educación Personal 📚"
    : "Agregar Educación Personal 📚";

  const backSectionHeaderProps = {
    imgUrl: "./EducacionPersonal.png",
    imgAlt: "Educación Personal",
    title: titleEducationSection,
    changeMenu,
  };

  return {
    handleEducation,
    backSectionHeaderProps,
    textButtonEducation,
  };
}
