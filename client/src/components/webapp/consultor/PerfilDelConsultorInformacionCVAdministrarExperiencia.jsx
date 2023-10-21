/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import ButtonSubmit from "../global/ButtonSubmit";
import BackSection from "../global/BackSection";

// AYUDAS A USAR
import { experienceInformationData } from "../../../helpers/PerfilDelConsultorAgregarCV";
import {
  listOfMonths,
  listOfMonthsExperience,
  listOfYears,
  listOfYearsExperience,
} from "../../../helpers/Selectores";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useDataExperience from "../../../hooks/consultor/useDataExperience";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionCVAdministrarExperiencia.css";
export default function PerfilDelConsultorInformacionCVAdministrarExperiencia({
  consultantInformation,
  changeMenu,
  setCheckCV,
  checkCV,
  elementID,
  setElementID,
}) {
  const { handleExperience, backSectionHeaderProps, textButtonExperience } =
    useDataExperience({
      changeMenu,
      setCheckCV,
      checkCV,
      setElementID,
      elementID,
    });
  const { isDisabled, submitDisabled } = useDisabled();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (elementID) {
      const { consultantExperience } = consultantInformation.data;
      const informationExperience = consultantExperience.find(
        ({ _id }) => _id === elementID
      );
      const formatStartDate = informationExperience.startDate.split(" ");
      const formatEndDate = informationExperience.endDate.split(" ");
      setValue("position", informationExperience.position);
      setValue("company", informationExperience.company);
      setValue("resume", informationExperience.resume);
      setValue("experienceMonthStart", formatStartDate[0]);
      setValue("experienceYearStart", formatStartDate[1]);
      setValue("experienceMonthEnd", formatEndDate[0]);
      setValue("experienceYearEnd", formatEndDate[1]);
    }
  }, []);

  const handleExperienceConsultant = handleSubmit(async (data) => {
    submitDisabled();
    handleExperience(data);
  });

  return (
    <form
      className="Main__Profile__Information--Content--CVExperience--Administration"
      onSubmit={handleExperienceConsultant}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <BackSection {...backSectionHeaderProps} setElementID={setElementID}>
        Regresar
      </BackSection>
      {experienceInformationData.map(
        ({ icon, inputType, inputName, placeholder, validator }) => (
          <>
            <p className="Main__Profile__Information--Content--CVExperience--Administration--TitleInput">
              {placeholder}:
            </p>
            <div className="Main__Profile__Information--Content--CVExperience--Administration--ContainerInputs">
              <span className="Main__Profile__Information--Content--CVExperience--Administration--ContainerInputs--Icon">
                <ion-icon name={icon}></ion-icon>
              </span>

              {inputName !== "resume" ? (
                <input
                  type={inputType}
                  {...register(inputName, validator)}
                  className="Main__Profile__Information--Content--CVExperience--Administration--ContainerInputs--Inputs"
                  placeholder="Escribe aquí..."
                />
              ) : (
                <textarea
                  type={inputType}
                  {...register(inputName, validator)}
                  className="Main__Profile__Information--Content--CVExperience--Administration--ContainerInputs--Inputs Textarea"
                  placeholder="Escribe aquí..."
                />
              )}
            </div>
            <ErrorMessage
              errors={errors}
              name={inputName}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <small
                    key={type}
                    className="Main__Profile__Information--Content--CVExperience--Administration--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <p className="Main__Profile__Information--Content--CVExperience--Administration--TitleInput">
        Fecha de inicio:
      </p>
      <span className="Main__Profile__Information--Content--CVExperience--Administration--ContainerDates">
        <select
          {...register("experienceMonthStart")}
          className="Main__Profile__Information--Content--CVExperience--Administration--ContainerInputs--Inputs Dates"
        >
          {listOfMonths}
        </select>
        <select
          {...register("experienceYearStart")}
          className="Main__Profile__Information--Content--CVExperience--Administration--ContainerInputs--Inputs Dates"
        >
          {listOfYears}
        </select>
      </span>
      <p className="Main__Profile__Information--Content--CVExperience--Administration--TitleInput">
        Fecha de finalización:
      </p>
      <span className="Main__Profile__Information--Content--CVExperience--Administration--ContainerDates">
        <select
          {...register("experienceMonthEnd")}
          className="Main__Profile__Information--Content--CVExperience--Administration--ContainerInputs--Inputs Dates"
        >
          {listOfMonthsExperience}
        </select>
        <select
          {...register("experienceYearEnd")}
          className="Main__Profile__Information--Content--CVExperience--Administration--ContainerInputs--Inputs Dates"
        >
          {listOfYearsExperience}
        </select>
      </span>
      <ButtonSubmit isDisabled={isDisabled} text={textButtonExperience} />
    </form>
  );
}
