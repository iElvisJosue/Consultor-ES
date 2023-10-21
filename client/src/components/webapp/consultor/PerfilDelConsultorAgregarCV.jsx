/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// CONTEXTOS A USAR
import { useConsultant } from "../../../context/ConsultantContext";

// COMPONENTES A USAR
import HeaderForm from "../../../components/webapp/global/HeaderForm";
import ButtonSubmit from "../../../components/webapp/global/ButtonSubmit";
import Navbar from "../../../components/webapp/global/Navbar";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useSteps from "../../../hooks/useSteps";

// AYUDAS A USAR
import { handleResponseMessages } from "../../../helpers/Respuestas";
import {
  listOfMonths,
  listOfMonthsExperience,
  listOfYears,
  listOfYearsExperience,
} from "../../../helpers/Selectores";
import {
  resumeHeaderProps,
  experienceHeaderProps,
  educationHeaderProps,
  skillsHeaderProps,
  resumeInformationData,
  experienceInformationData,
  educationInformationData,
  skillsInformationData,
} from "../../../helpers/PerfilDelConsultorAgregarCV";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorAgregarCV.css";

export default function PerfilDelConsultorAgregarCV({ setCheckCV, checkCV }) {
  const { createResumeCV } = useConsultant();
  const { progressWidth, classStep, changeStep } = useSteps();
  const { isDisabled, submitDisabled } = useDisabled();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const addResumeCV = handleSubmit(async (data) => {
    submitDisabled();
    try {
      const res = await createResumeCV(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setCheckCV(!checkCV);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  return (
    <>
      <Navbar navSection={"NavbarAgregarCV"} />
      <form
        onSubmit={addResumeCV}
        className="Main__Profile__Form"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <span
          className="Main__Profile__Form--Progress"
          style={{ width: progressWidth }}
        ></span>
        <div className={classStep}>
          <HeaderForm {...resumeHeaderProps} />
          {resumeInformationData.map(
            ({ icon, inputType, inputName, placeholder, validator }) => (
              <>
                <div className="Main__Profile__Form--ContainerInputs">
                  <span className="Main__Profile__Form--ContainerInputs--Icon">
                    <ion-icon name={icon}></ion-icon>
                  </span>
                  <input
                    type={inputType}
                    {...register(inputName, validator)}
                    className="Main__Profile__Form--ContainerInputs--Inputs"
                    placeholder={placeholder}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name={inputName}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="Main__Profile__Form--SmallError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )
          )}
          <button
            className="Main__Form--ButtonSubmit"
            onClick={(e) => changeStep(e, "Two")}
          >
            Siguiente
          </button>
        </div>
        <div className={classStep}>
          <HeaderForm {...skillsHeaderProps} />
          {skillsInformationData.map(({ icon, inputName, typeList }) => (
            <>
              <div className="Main__Profile__Form--ContainerInputs">
                <span className="Main__Profile__Form--ContainerInputs--Icon">
                  <ion-icon name={icon}></ion-icon>
                </span>
                <select
                  {...register(inputName)}
                  className="Main__Profile__Form--ContainerInputs--Inputs"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {typeList}
                </select>
              </div>
            </>
          ))}
          <span className="Main__Profile__Form--GroupButtons">
            <button
              className="Main__Form--ButtonSubmit"
              onClick={(e) => changeStep(e, "One")}
            >
              Regresar
            </button>
            <button
              className="Main__Form--ButtonSubmit"
              onClick={(e) => changeStep(e, "Three")}
            >
              Siguiente
            </button>
          </span>
        </div>
        <div className={classStep}>
          <HeaderForm {...experienceHeaderProps} />
          {experienceInformationData.map(
            ({ icon, inputType, inputName, placeholder, validator }) => (
              <>
                <div className="Main__Profile__Form--ContainerInputs">
                  <span className="Main__Profile__Form--ContainerInputs--Icon">
                    <ion-icon name={icon}></ion-icon>
                  </span>
                  <input
                    type={inputType}
                    {...register(inputName, validator)}
                    className="Main__Profile__Form--ContainerInputs--Inputs"
                    placeholder={placeholder}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name={inputName}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="Main__Profile__Form--SmallError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )
          )}
          <p className="Main__Profile__Form--TitleInput">Fecha de inicio:</p>
          <span className="Main__Profile__Form--ContainerDates">
            <select
              {...register("experienceMonthStart", { required: true })}
              className="Main__Profile__Form--ContainerInputs--Inputs Dates"
            >
              {listOfMonths}
            </select>
            <select
              {...register("experienceYearStart", { required: true })}
              className="Main__Profile__Form--ContainerInputs--Inputs Dates"
            >
              {listOfYears}
            </select>
          </span>
          <p className="Main__Profile__Form--TitleInput">
            Fecha de finalización:
          </p>
          <span className="Main__Profile__Form--ContainerDates">
            <select
              {...register("experienceMonthEnd", { required: true })}
              className="Main__Profile__Form--ContainerInputs--Inputs Dates"
            >
              {listOfMonthsExperience}
            </select>
            <select
              {...register("experienceYearEnd", { required: true })}
              className="Main__Profile__Form--ContainerInputs--Inputs Dates"
            >
              {listOfYearsExperience}
            </select>
          </span>
          <span className="Main__Profile__Form--GroupButtons">
            <button
              className="Main__Form--ButtonSubmit"
              onClick={(e) => changeStep(e, "Two")}
            >
              Regresar
            </button>
            <button
              className="Main__Form--ButtonSubmit"
              onClick={(e) => changeStep(e, "Four")}
            >
              Siguiente
            </button>
          </span>
        </div>
        <div className={classStep}>
          <HeaderForm {...educationHeaderProps} />
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
                <div className="Main__Profile__Form--ContainerInputs">
                  <span className="Main__Profile__Form--ContainerInputs--Icon">
                    <ion-icon name={icon}></ion-icon>
                  </span>
                  {isSelect ? (
                    <select
                      {...register(inputName)}
                      className="Main__Profile__Form--ContainerInputs--Inputs"
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
                      className="Main__Profile__Form--ContainerInputs--Inputs"
                      placeholder={placeholder}
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
                        className="Main__Profile__Form--SmallError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )
          )}
          <p className="Main__Profile__Form--TitleInput">Fecha de inicio:</p>
          <span className="Main__Profile__Form--ContainerDates">
            <select
              {...register("studiesMonthStart")}
              className="Main__Profile__Form--ContainerInputs--Inputs Dates"
            >
              {listOfMonths}
            </select>
            <select
              {...register("studiesYearStart")}
              className="Main__Profile__Form--ContainerInputs--Inputs Dates"
            >
              {listOfYears}
            </select>
          </span>
          <p className="Main__Profile__Form--TitleInput">
            Fecha de finalización:
          </p>
          <span className="Main__Profile__Form--ContainerDates">
            <select
              {...register("studiesMonthEnd")}
              className="Main__Profile__Form--ContainerInputs--Inputs Dates"
            >
              {listOfMonths}
            </select>
            <select
              {...register("studiesYearEnd")}
              className="Main__Profile__Form--ContainerInputs--Inputs Dates"
            >
              {listOfYears}
            </select>
          </span>
          <span className="Main__Profile__Form--GroupButtons">
            <button
              className="Main__Form--ButtonSubmit"
              onClick={(e) => changeStep(e, "Three")}
            >
              Regresar
            </button>
            <ButtonSubmit text="Finalizar" isDisabled={isDisabled} />
          </span>
        </div>
      </form>
    </>
  );
}
