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
  consultantInformation,
}) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const { addExperience, updateExperience } = useConsultant();

  const textButton = update ? "Actualizar experiencia" : "Agregar experiencia";

  const ERROR_MESSAGES = {
    AGREGADA: "¡Experiencia agregada correctamente!",
    ACTUALIZADA: "¡Experiencia actualizada correctamente!",
    ERROR: "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
  };

  useEffect(() => {
    if (update) {
      const startDate =
        consultantInformation.data.experienceCV[id].startDate.split(" ");
      const endDate =
        consultantInformation.data.experienceCV[id].endDate.split(" ");

      setValue(
        "position",
        consultantInformation.data.experienceCV[id].position
      );
      setValue("company", consultantInformation.data.experienceCV[id].company);
      setValue("resume", consultantInformation.data.experienceCV[id].resume);
      setValue("experienceMonthStart", startDate[0]);
      setValue("experienceYearStart", startDate[1]);
      setValue("experienceMonthEnd", endDate[0]);
      setValue("experienceYearEnd", endDate[1]);
    }
  }, [update]);

  const addNewExperience = handleSubmit(async (data) => {
    try {
      if (update) {
        data.id = id;
        const res = await updateExperience(data);
        checkResult(res, "ACTUALIZADA");
      } else {
        const res = await addExperience(data);
        checkResult(res, "AGREGADA");
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.ERROR);
      console.log(error);
    }
  });

  const checkResult = (res, MESSAGE) => {
    if (!res.response) {
      toast.success(ERROR_MESSAGES[MESSAGE]);
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
