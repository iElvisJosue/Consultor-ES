/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { listOfMonths, listOfYears } from "../../helpers/globalFunctions";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";

export default function ConsultantAddExperience({
  setCheckCV,
  checkCV,
  setSeeForm,
  setUpdate,
  update,
  setId,
  id,
  consultantExperience,
}) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { addExperience, updateExperience } = useConsultant();

  const textButton = update ? "Actualizar experiencia" : "Agregar experiencia";

  const ERROR_MESSAGES = {
    AGREGADO: "¡Experiencia agregada correctamente!",
    ACTUALIZADO: "¡Experiencia actualizada correctamente!",
    ERROR: "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
  };

  useEffect(() => {
    if (consultantExperience.length > 0) {
      consultantExperience.forEach(
        ({ _id, company, position, resume, startDate, endDate }) => {
          if (_id === id) {
            const formatStartDate = startDate.split(" ");
            const formatEndDate = endDate.split(" ");
            setValue("position", position);
            setValue("company", company);
            setValue("resume", resume);
            setValue("experienceMonthStart", formatStartDate[0]);
            setValue("experienceYearStart", formatStartDate[1]);
            setValue("experienceMonthEnd", formatEndDate[0]);
            setValue("experienceYearEnd", formatEndDate[1]);
          }
        }
      );
    }
  }, [update]);

  const addNewExperience = handleSubmit(async (data) => {
    try {
      if (update) {
        data.id = id;
        const res = await updateExperience(data);
        checkResult(res);
      } else {
        const res = await addExperience(data);
        checkResult(res);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.ERROR);
      console.log(error);
    }
  });

  const checkResult = (res) => {
    if (!res.response) {
      toast.success(ERROR_MESSAGES[res.data[0]]);
    } else {
      toast.error(ERROR_MESSAGES.ERROR);
    }
    setSeeForm(false);
    setCheckCV(!checkCV);
    setUpdate(false);
    setId(null);
    reset();
  };

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
      <button type="submit">{textButton}</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
