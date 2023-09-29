/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useConsultant } from "../../context/ConsultantContext";
import { useEffect } from "react";

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

  const ERROR_MESSAGES = {
    ACTUALIZADO: "¡Datos bancarios actualizados correctamente!",
    AGREGADO: "¡Datos bancarios agregados correctamente!",
    ERROR: "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
  };

  const textButton = consultantBank ? "Actualizar" : "Agregar";

  const verifyProcessDataBank = handleSubmit(async (data) => {
    if (consultantBank) {
      updateDataBankConsultant(data);
    } else {
      addDataBankConsultant(data);
    }
  });

  const addDataBankConsultant = async (data) => {
    try {
      const res = await registerDataBank(data);
      checkResult(res, "AGREGADO");
    } catch (error) {
      toast.error(ERROR_MESSAGES.ERROR);
      console.log(error);
    }
  };
  const updateDataBankConsultant = async (data) => {
    try {
      const res = await updateDataBank(data);
      checkResult(res, "ACTUALIZADO");
    } catch (error) {
      toast.error(ERROR_MESSAGES.ERROR);
      console.log(error);
    }
  };
  const checkResult = (res, MESSAGE) => {
    if (!res.response) {
      toast.success(ERROR_MESSAGES[MESSAGE]);
      setCheckCV(!checkCV);
      setUpdateDataBank(false);
    } else {
      toast.error(ERROR_MESSAGES.ERROR);
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
      <Toaster richColors position="top-right" />
    </form>
  );
}
