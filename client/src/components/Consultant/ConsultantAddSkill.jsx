/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";

export default function ConsultantAddSkill({
  setCheckCV,
  checkCV,
  setSeeForm,
}) {
  const { register, handleSubmit, reset } = useForm();

  const { addSkill } = useConsultant();
  const ERROR_MESSAGES = {
    AGREGADO: "¡Habilidad agregada correctamente!",
    EXISTENTE: "¡La habilidad ingresada ya existe en tu CV!",
    FORMATO:
      "¡Formato de datos incorrecto! Inténtalo de nuevo con otro nombre.",
    ERROR: "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
  };

  const loadMessage = (status) => {
    switch (status) {
      case "AGREGADO":
        return toast.success(ERROR_MESSAGES.AGREGADO);
      case "EXISTENTE":
        return toast.error(ERROR_MESSAGES.EXISTENTE);
      case "FORMATO":
        return toast.error(ERROR_MESSAGES.FORMATO);
      default:
        return toast.error(ERROR_MESSAGES.ERROR);
    }
  };

  const addNewSkill = handleSubmit(async (data) => {
    try {
      const res = await addSkill(data);
      if (!res.response) {
        loadMessage(res.data[0]);
        setSeeForm(false);
        setCheckCV(!checkCV);
        reset();
      } else {
        loadMessage("FORMATO");
      }
    } catch (error) {
      loadMessage("ERROR");
      console.log(error);
    }
  });

  return (
    <form onSubmit={addNewSkill} className="AddArea">
      <h1>Escribe la habilidad:</h1>
      <input {...register("nameSkill", { required: true })} />
      <button type="submit">Agregar</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
