/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { useEffect } from "react";
import { handleResponseMessages } from "../../helpers/globalFunctions";

export default function ConsultantAddDataBank({
  setUpdateDataBank,
  consultantBank,
  setCheckCV,
  checkCV,
}) {
  const { register, handleSubmit, setValue } = useForm();
  const { registerDataBank, updateDataBank } = useConsultant();

  useEffect(() => {
    if (consultantBank) {
      setValue("account", consultantBank.account);
      setValue("bank", consultantBank.bank);
      setValue("name", consultantBank.name);
      setValue("RFC", consultantBank.RFC);
      setValue("country", consultantBank.country);
      setValue("address", consultantBank.address);
    }
  }, [consultantBank]);

  const textButton = consultantBank ? "Actualizar" : "Agregar";

  const verifyProcessDataBank = handleSubmit(async (data) => {
    if (consultantBank) {
      updateDataBankConsultant(data);
    } else {
      addDataBankConsultant(data);
    }
  });

  const handleError = (error) => {
    const { status, data } = error.response;
    handleResponseMessages({ status, data });
  };

  const addDataBankConsultant = async (data) => {
    try {
      const res = await registerDataBank(data);
      checkResult(res);
    } catch (error) {
      handleError(error);
    }
  };
  const updateDataBankConsultant = async (data) => {
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
      setUpdateDataBank(false);
    }
  };

  return (
    <form onSubmit={verifyProcessDataBank} className="AddDataBank">
      <p>Número de cuenta o clabe interbancaria:</p>
      <input type="text" {...register("account", { required: true })} />
      <p>Institución bancaria:</p>
      <input type="text" {...register("bank", { required: true })} />
      <p>Nombre del derechohabiente:</p>
      <input type="text" {...register("name", { required: true })} />
      <p>RFC:</p>
      <input type="text" {...register("RFC", { required: true })} />
      <p>País de residencia:</p>
      <input type="text" {...register("country", { required: true })} />
      <p>Domicilio fiscal:</p>
      <input type="text" {...register("address", { required: true })} />
      <button type="submit">{textButton}</button>
    </form>
  );
}
