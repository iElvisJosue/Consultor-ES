/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useConsultant } from "../../context/ConsultantContext";
import { useEffect } from "react";

export default function ConsultantAddDataBank({
  bankInformation,
  setCheckCV,
  setDataBankInformation,
  checkCV,
}) {
  const { register, handleSubmit, setValue } = useForm();
  const { registerDataBank } = useConsultant();

  useEffect(() => {
    if (bankInformation) {
      setValue("account", bankInformation.account);
      setValue("bank", bankInformation.bank);
      setValue("name", bankInformation.name);
      setValue("RFC", bankInformation.RFC);
      setValue("country", bankInformation.country);
      setValue("address", bankInformation.address);
    }
  }, [bankInformation]);

  const ERROR_MESSAGES = {
    AGREGADO: "¡Datos bancarios agregados correctamente!",
    ERROR: "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
  };

  const addDataBank = handleSubmit(async (data) => {
    try {
      const res = await registerDataBank(data);
      console.log(res);
      if (!res.response) {
        toast.success(ERROR_MESSAGES.AGREGADO);
        setDataBankInformation(true);
        setCheckCV(!checkCV);
      } else {
        toast.error(ERROR_MESSAGES.ERROR);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.ERROR);
      console.log(error);
    }
  });

  return (
    <form onSubmit={addDataBank} className="AddDataBank">
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
      <button type="submit">Agregar</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
