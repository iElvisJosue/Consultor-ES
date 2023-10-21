// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";

// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useDataBank({
  setCheckCV,
  checkCV,
  submitDisabled,
  consultantBank,
}) {
  const { registerDataBank, updateDataBank } = useConsultant();
  const addDataBankConsultant = async (data) => {
    submitDisabled();
    try {
      const res = await registerDataBank(data);
      checkResult(res);
    } catch (error) {
      handleError(error);
    }
  };
  const updateDataBankConsultant = async (data) => {
    submitDisabled();
    try {
      const res = await updateDataBank(data);
      checkResult(res);
    } catch (error) {
      handleError(error);
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
    }
  };
  const handleError = (error) => {
    const { status, data } = error.response;
    handleResponseMessages({ status, data });
  };

  const bankHeaderProps = {
    backButton: false,
    imgUrl: "./InformacionBancaria.png",
    imgAlt: "Informacion Bancaria",
    title: "Agregar Información Bancaria",
  };

  const textButton = consultantBank
    ? "Actualizar Información Bancaria"
    : "Agregar Información Bancaria";

  return {
    addDataBankConsultant,
    updateDataBankConsultant,
    textButton,
    bankHeaderProps,
  };
}
