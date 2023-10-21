/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import ButtonSubmit from "../global/ButtonSubmit";
import BackSection from "../global/BackSection";

// AYUDAS A USAR
import { educationInformationData } from "../../../helpers/PerfilDelConsultorAgregarCV";
import { listOfMonths, listOfYears } from "../../../helpers/Selectores";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useDataEducation from "../../../hooks/consultor/useDataEducation";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionCVAdministrarEducacion.css";
export default function PerfilDelConsultorInformacionCVAdministrarEducacion({
  consultantInformation,
  changeMenu,
  setCheckCV,
  checkCV,
  elementID,
  setElementID,
}) {
  const { handleEducation, backSectionHeaderProps, textButtonEducation } =
    useDataEducation({
      changeMenu,
      setCheckCV,
      checkCV,
      elementID,
      setElementID,
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
      const { consultantEducation } = consultantInformation.data;
      const informationEducation = consultantEducation.find(
        ({ _id }) => _id === elementID
      );
      const formatStartDate = informationEducation.startDate.split(" ");
      const formatEndDate = informationEducation.endDate.split(" ");
      setValue("institution", informationEducation.institution);
      setValue("area", informationEducation.area);
      setValue("educationLevel", informationEducation.educationLevel);
      setValue("studiesMonthStart", formatStartDate[0]);
      setValue("studiesYearStart", formatStartDate[1]);
      setValue("studiesMonthEnd", formatEndDate[0]);
      setValue("studiesYearEnd", formatEndDate[1]);
    }
  }, []);

  const handleEducationConsultant = handleSubmit(async (data) => {
    submitDisabled();
    handleEducation(data);
  });

  return (
    <form
      className="Main__Profile__Information--Content--CVEducation--Administration"
      onSubmit={handleEducationConsultant}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <BackSection {...backSectionHeaderProps} setElementID={setElementID}>
        Regresar
      </BackSection>
      {educationInformationData.map(
        ({
          icon,
          inputType,
          inputName,
          placeholder,
          validator,
          isSelect = false,
          typeList,
        }) => (
          <>
            <p className="Main__Profile__Information--Content--CVEducation--Administration--TitleInput">
              {placeholder}:
            </p>
            <div className="Main__Profile__Information--Content--CVEducation--Administration--ContainerInputs">
              <span className="Main__Profile__Information--Content--CVEducation--Administration--ContainerInputs--Icon">
                <ion-icon name={icon}></ion-icon>
              </span>
              {isSelect ? (
                <select
                  {...register(inputName)}
                  className="Main__Profile__Information--Content--CVEducation--Administration--ContainerInputs--Inputs"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {typeList}
                </select>
              ) : (
                <input
                  type={inputType}
                  {...register(inputName, validator)}
                  className="Main__Profile__Information--Content--CVEducation--Administration--ContainerInputs--Inputs"
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
                    className="Main__Profile__Information--Content--CVEducation--Administration--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <p className="Main__Profile__Information--Content--CVEducation--Administration--TitleInput">
        Fecha de inicio:
      </p>
      <span className="Main__Profile__Information--Content--CVEducation--Administration--ContainerDates">
        <select
          {...register("studiesMonthStart")}
          className="Main__Profile__Information--Content--CVEducation--Administration--ContainerInputs--Inputs Dates"
        >
          {listOfMonths}
        </select>
        <select
          {...register("studiesYearStart")}
          className="Main__Profile__Information--Content--CVEducation--Administration--ContainerInputs--Inputs Dates"
        >
          {listOfYears}
        </select>
      </span>
      <p className="Main__Profile__Information--Content--CVEducation--Administration--TitleInput">
        Fecha de finalización:
      </p>
      <span className="Main__Profile__Information--Content--CVEducation--Administration--ContainerDates">
        <select
          {...register("studiesMonthEnd")}
          className="Main__Profile__Information--Content--CVEducation--Administration--ContainerInputs--Inputs Dates"
        >
          {listOfMonths}
        </select>
        <select
          {...register("studiesYearEnd")}
          className="Main__Profile__Information--Content--CVEducation--Administration--ContainerInputs--Inputs Dates"
        >
          {listOfYears}
        </select>
      </span>
      <ButtonSubmit isDisabled={isDisabled} text={textButtonEducation} />
    </form>
  );
}
