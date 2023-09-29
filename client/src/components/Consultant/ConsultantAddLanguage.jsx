/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { listOfLanguages } from "../../helpers/globalFunctions";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";

export default function ConsultantAddLanguage({
  setCheckCV,
  checkCV,
  setSeeForm,
}) {
  const { register, handleSubmit, reset } = useForm();
  const { addLanguage } = useConsultant();

  const ERROR_MESSAGES = {
    AGREGADO: "¡Idioma agregado correctamente!",
    EXISTENTE: "¡El idioma seleccionado ya existe en tu CV!",
    ERROR: "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
  };

  const loadMessage = (status) => {
    switch (status) {
      case "AGREGADO":
        return toast.success(ERROR_MESSAGES.AGREGADO);
      case "EXISTENTE":
        return toast.error(ERROR_MESSAGES.EXISTENTE);
      default:
        return toast.error(ERROR_MESSAGES.ERROR);
    }
  };

  const addNewLanguage = handleSubmit(async (data) => {
    try {
      const res = await addLanguage(data);
      if (!res.response) {
        loadMessage(res.data[0]);
        setSeeForm(false);
        setCheckCV(!checkCV);
        reset();
      } else {
        loadMessage("ERROR");
      }
    } catch (error) {
      loadMessage("ERROR");
      console.log(error);
    }
  });

  return (
    <form onSubmit={addNewLanguage} className="AddLanguage">
      <h1>Selecciona el idioma y tu nivel:</h1>
      <select {...register("nameLanguage", { required: true })}>
        {listOfLanguages}
      </select>
      <select {...register("levelLanguage", { required: true })}>
        <option value="Múy básico" defaultValue={true}>
          Múy básico
        </option>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
        <option value="Nativo">Nativo</option>
      </select>
      <button type="submit">Agregar</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
