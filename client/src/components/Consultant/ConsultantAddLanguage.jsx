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

  const addNewLanguage = handleSubmit(async (data) => {
    try {
      const res = await addLanguage(data);
      if (!res.response) {
        toast.success("¡Idioma agregado correctamente!");
        setSeeForm(false);
        setCheckCV(!checkCV);
        reset();
      } else {
        toast.error(
          "Ha ocurrido un error al agregar el idioma. Inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      toast.error(
        "Ha ocurrido un error al agregar el idioma. Inténtalo de nuevo más tarde."
      );
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
