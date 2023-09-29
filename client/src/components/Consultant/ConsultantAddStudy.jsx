/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useConsultant } from "../../context/ConsultantContext";
import { listOfMonths, listOfYears } from "../../helpers/globalFunctions";
import { Toaster, toast } from "sonner";

export default function ConsultantAddStudy({
  setCheckCV,
  checkCV,
  setSeeForm,
  setUpdate,
  update,
  setId,
  id,
  consultantEducation,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const { addStudy, updateEducation } = useConsultant();

  const textButton = update ? "Actualizar estudio" : "Agregar estudio";

  const ERROR_MESSAGES = {
    AGREGADO: "¡Estudio agregado correctamente!",
    ACTUALIZADO: "¡Estudio actualizado correctamente!",
    ERROR: "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
  };

  useEffect(() => {
    if (consultantEducation.length > 0) {
      consultantEducation.forEach(
        ({ _id, institution, educationLevel, area, startDate, endDate }) => {
          if (_id === id) {
            const formatStartDate = startDate.split(" ");
            const formatEndDate = endDate.split(" ");
            setValue("institution", institution);
            setValue("educationLevel", educationLevel);
            setValue("area", area);
            setValue("studiesMonthStart", formatStartDate[0]);
            setValue("studiesYearStart", formatStartDate[1]);
            setValue("studiesMonthEnd", formatEndDate[0]);
            setValue("studiesYearEnd", formatEndDate[1]);
          }
        }
      );
    }
  }, [update]);

  const addNewStudy = handleSubmit(async (data) => {
    try {
      if (update) {
        data.id = id;
        const res = await updateEducation(data);
        checkResult(res, "ACTUALIZADO");
      } else {
        const res = await addStudy(data);
        checkResult(res, "AGREGADO");
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
    <form onSubmit={addNewStudy} className="AddStudy">
      <p>Nombre de la institución:</p>
      <input type="text" {...register("institution", { required: true })} />
      {errors.institution && (
        <p
          style={{
            color: "red",
          }}
        >
          El nombre es obligatorio
        </p>
      )}
      <p>Nivel de educación</p>
      <select {...register("educationLevel", { required: true })}>
        <option value="Educación Superior - Licenciatura" defaultValue={true}>
          Educación Superior - Licenciatura
        </option>
        <option value="Educación Superior - Especialidad">
          Educación Superior - Especialidad
        </option>
        <option value="Educación Superior - Maestría">
          Educación Superior - Maestría
        </option>
        <option value="Educación Superior - Doctorado">
          Educación Superior - Doctorado
        </option>
      </select>
      <p>Área profesional</p>
      <input type="text" {...register("area", { required: true })} />
      {errors.area && (
        <p
          style={{
            color: "red",
          }}
        >
          El área es obligatorio
        </p>
      )}
      <p>Fecha de inicio:</p>
      <span>
        <select {...register("studiesMonthStart", { required: true })}>
          {listOfMonths}
        </select>
        <select {...register("studiesYearStart", { required: true })}>
          {listOfYears}
        </select>
      </span>
      <p>Fecha de finalización:</p>
      <span>
        <select {...register("studiesMonthEnd", { required: true })}>
          {listOfMonths}
        </select>
        <select {...register("studiesYearEnd", { required: true })}>
          {listOfYears}
        </select>
      </span>
      <button type="submit">{textButton}</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
