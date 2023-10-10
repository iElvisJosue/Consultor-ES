/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import {
  listOfMonths,
  listOfMonthsExperience,
  listOfYears,
  listOfYearsExperience,
} from "../../helpers/globalFunctions";
import { useConsultant } from "../../context/ConsultantContext";
import { useEffect } from "react";
import { handleResponseMessages } from "../../helpers/globalFunctions";

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
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const checkResult = (res) => {
    if (res.response) {
      const { status, data } = res.response;
      handleResponseMessages({ status, data });
    } else {
      const { status, data } = res;
      handleResponseMessages({ status, data });
    }
    setSeeForm(false);
    setCheckCV(!checkCV);
    setUpdate(false);
    setId(null);
    reset();
  };

  return (
    <form onSubmit={addNewExperience} className="AddExperience">
      <button
        onClick={(e) => {
          e.preventDefault();
          setSeeForm(false);
        }}
      >
        Cerrar formulario
      </button>
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
          {listOfMonthsExperience}
        </select>
        <select {...register("experienceYearEnd", { required: true })}>
          {listOfYearsExperience}
        </select>
      </span>
      <button type="submit">{textButton}</button>
    </form>
  );
}
