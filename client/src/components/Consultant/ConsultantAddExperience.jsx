/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { listOfMonths, listOfYears } from "../../global/globalFunctions";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";

export default function ConsultantAddExperience({
  setCheckCV,
  checkCV,
  setSeeForm,
}) {
  const { register, handleSubmit, reset } = useForm();

  const { addExperience } = useConsultant();

  const addNewExperience = handleSubmit(async (data) => {
    try {
      await addExperience(data);
      toast.success("¡Experiencia agregada correctamente!");
      setSeeForm(false);
      setCheckCV(!checkCV);
      reset();
    } catch (error) {
      toast.error(
        "Ha ocurrido un error al agregar la experiencia. Inténtalo de nuevo más tarde."
      );
      console.log(error);
    }
  });

  return (
    <form onSubmit={addNewExperience} className="AddExperience">
      <p>Puesto/Cargo:</p>
      <input type="text" {...register("position", { required: true })} />
      <p>Nombre de la empresa:</p>
      <input type="text" {...register("company", { required: true })} />
      <p>Resumen del cargo que desempeñaste:</p>
      <input type="text" {...register("resume", { required: true })} />
      <p>Fecha de inicio:</p>
      <span>
        <select {...register("experienceMonthStart", { required: true })}>
          {listOfMonths}
        </select>
        <select {...register("experienceYearStart", { required: true })}>
          {listOfYears}
        </select>
      </span>
      <p>Fecha de finalización:</p>
      <span>
        <select {...register("experienceMonthEnd", { required: true })}>
          {listOfMonths}
        </select>
        <select {...register("experienceYearEnd", { required: true })}>
          {listOfYears}
        </select>
      </span>
      <button type="submit">Agregar</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
