// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useDataAbility({
  setCheckCV,
  checkCV,
  submitDisabled,
  changeMenu,
  setElementID,
}) {
  const { addSkill } = useConsultant();
  const addAbilityConsultant = async (data) => {
    submitDisabled();
    try {
      const res = await addSkill(data);
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
    imgUrl: "./HabilidadPersonal.png",
    imgAlt: "Habilidad Personal",
    title: "Agregar Habilidad 🎲",
    changeMenu,
  };

  return {
    addAbilityConsultant,
    backSectionHeaderProps,
  };
}
