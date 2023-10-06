import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { handleResponseMessages } from "../../helpers/globalFunctions";
import {
  listOfMonths,
  listOfYears,
  listOfSpecialtiesAreas,
  listOfEducationalLevels,
} from "../../helpers/globalFunctions";
import HeaderForm from "../Form/HeaderForm";
import ButtonSubmitForm from "../Form/ButtonSubmitForm";

// eslint-disable-next-line react/prop-types
export default function ConsultantAddCV({ setCheckCV, checkCV }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createResumeCV } = useConsultant();

  const addResumeCV = handleSubmit(async (data) => {
    try {
      const res = await createResumeCV(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setTimeout(() => {
          setCheckCV(!checkCV);
        }, 1500);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const resumeHeaderProps = {
    imgUrl: "./ResumenProfesional.png",
    imgAlt: "Resumen De Perfil Logo",
    title: "Resumen de tu perfil profesional:",
  };
  const experienceHeaderProps = {
    imgUrl: "./ExperienciaProfesional.png",
    imgAlt: "Experiencia De Perfil Logo",
    title: "Agrega tu experiencia más relevante:",
  };
  const educationHeaderProps = {
    imgUrl: "./EducacionPersonal.png",
    imgAlt: "Educación Personal Logo",
    title: "Agrega tu nivel de estudios:",
  };
  const skillsHeaderProps = {
    imgUrl: "./EspecialidadPersonal.png",
    imgAlt: "Especialidad Personal Logo",
    title: "Selecciona tu especialidad:",
  };
  const resumeInformationData = [
    {
      icon: "briefcase-outline",
      inputType: "text",
      inputName: "profession",
      placeholder: "Profesión",
      messageError: "El nombre de tu profesión es requerido. ⚠️",
    },
    {
      icon: "document-text-outline",
      inputType: "text",
      inputName: "description",
      placeholder: "Resumen breve",
      messageError: "Tu resumen es requerido. ⚠️",
    },
  ];
  const experienceInformationData = [
    {
      icon: "accessibility-outline",
      inputType: "text",
      inputName: "position",
      placeholder: "Puesto/Cargo",
      messageError: "El nombre de tu puesto/cargo es requerido. ⚠️",
    },
    {
      icon: "business-outline",
      inputType: "text",
      inputName: "company",
      placeholder: "Empresa",
      messageError: "El nombre de la empresa es requerido. ⚠️",
    },
    {
      icon: "document-text-outline",
      inputType: "text",
      inputName: "resume",
      placeholder: "Resumen breve",
      messageError: "El resumen es requerido. ⚠️",
    },
  ];
  const educationInformationData = [
    {
      icon: "school-outline",
      inputType: "text",
      inputName: "institution",
      placeholder: "Institución",
      messageError: "El nombre de la escuela es requerido. ⚠️",
    },
    {
      icon: "footsteps-outline",
      inputName: "educationLevel",
      isSelect: true,
      typeList: listOfEducationalLevels,
    },
    {
      icon: "library-outline",
      inputType: "text",
      inputName: "area",
      placeholder: "Área de estudios",
      messageError: "El nombre de la área de estudios es requerido. ⚠️",
    },
  ];
  const skillsInformationData = [
    {
      icon: "medal-outline",
      inputName: "nameArea",
      typeList: listOfSpecialtiesAreas,
    },
  ];

  return (
    <div>
      <form onSubmit={addResumeCV} className="Main__Form ConsultantAddCV">
        <HeaderForm {...resumeHeaderProps} />
        {resumeInformationData.map(
          ({
            icon,
            inputType,
            inputName,
            placeholder,
            messageError,
            required = true,
          }) => (
            <>
              <div className="Main__Form--ContainerInputs">
                <span className="Main__Form--Inputs--Icon">
                  <ion-icon name={icon}></ion-icon>
                </span>
                <input
                  type={inputType}
                  {...register(inputName, { required: required })}
                  className="Main__Form--Inputs ConsultantAddCV"
                  placeholder={placeholder}
                />
              </div>
              {errors[inputName] && (
                <small className="Main__Form--SmallError">{messageError}</small>
              )}
            </>
          )
        )}
        <HeaderForm {...experienceHeaderProps} />
        {experienceInformationData.map(
          ({
            icon,
            inputType,
            inputName,
            placeholder,
            messageError,
            required = true,
          }) => (
            <>
              <div className="Main__Form--ContainerInputs">
                <span className="Main__Form--Inputs--Icon">
                  <ion-icon name={icon}></ion-icon>
                </span>
                <input
                  type={inputType}
                  {...register(inputName, { required: required })}
                  className="Main__Form--Inputs ConsultantAddCV"
                  placeholder={placeholder}
                />
              </div>
              {errors[inputName] && (
                <small className="Main__Form--SmallError">{messageError}</small>
              )}
            </>
          )
        )}
        <p className="Main__Form--TitleInput">Fecha de inicio:</p>
        <span className="Main__Form--ContainerDates">
          <select
            {...register("experienceMonthStart", { required: true })}
            className="Main__Form--Inputs Dates"
          >
            {listOfMonths}
          </select>
          <select
            {...register("experienceYearStart", { required: true })}
            className="Main__Form--Inputs Dates"
          >
            {listOfYears}
          </select>
        </span>
        <p className="Main__Form--TitleInput">Fecha de finalización:</p>
        <span className="Main__Form--ContainerDates">
          <select
            {...register("experienceMonthEnd", { required: true })}
            className="Main__Form--Inputs Dates"
          >
            {listOfMonths}
          </select>
          <select
            {...register("experienceYearEnd", { required: true })}
            className="Main__Form--Inputs Dates"
          >
            {listOfYears}
          </select>
        </span>
        <HeaderForm {...educationHeaderProps} />
        {educationInformationData.map(
          ({
            icon,
            inputType,
            inputName,
            placeholder,
            messageError,
            required = true,
            isSelect = false,
            typeList,
          }) => (
            <>
              <div className="Main__Form--ContainerInputs">
                <span className="Main__Form--Inputs--Icon">
                  <ion-icon name={icon}></ion-icon>
                </span>
                {isSelect ? (
                  <select
                    {...register(inputName, {
                      required: required,
                    })}
                    className="Main__Form--Inputs ConsultantAddCV"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {typeList}
                  </select>
                ) : (
                  <input
                    type={inputType}
                    {...register(inputName, { required: required })}
                    className="Main__Form--Inputs ConsultantAddCV"
                    placeholder={placeholder}
                  />
                )}
              </div>
              {errors[inputName] && (
                <small className="Main__Form--SmallError">{messageError}</small>
              )}
            </>
          )
        )}
        <p className="Main__Form--TitleInput">Fecha de inicio:</p>
        <span className="Main__Form--ContainerDates">
          <select
            {...register("studiesMonthStart", { required: true })}
            className="Main__Form--Inputs Dates"
          >
            {listOfMonths}
          </select>
          <select
            {...register("studiesYearStart", { required: true })}
            className="Main__Form--Inputs Dates"
          >
            {listOfYears}
          </select>
        </span>
        <p className="Main__Form--TitleInput">Fecha de finalización:</p>
        <span className="Main__Form--ContainerDates">
          <select
            {...register("studiesMonthEnd", { required: true })}
            className="Main__Form--Inputs Dates"
          >
            {listOfMonths}
          </select>
          <select
            {...register("studiesYearEnd", { required: true })}
            className="Main__Form--Inputs Dates"
          >
            {listOfYears}
          </select>
        </span>
        <HeaderForm {...skillsHeaderProps} />
        {skillsInformationData.map(({ icon, inputName, typeList }) => (
          <>
            <div className="Main__Form--ContainerInputs">
              <span className="Main__Form--Inputs--Icon">
                <ion-icon name={icon}></ion-icon>
              </span>
              <select
                {...register(inputName, {
                  required: true,
                })}
                className="Main__Form--Inputs ConsultantAddCV"
                style={{
                  fontWeight: "bold",
                }}
              >
                {typeList}
              </select>
            </div>
          </>
        ))}
        <ButtonSubmitForm text="Crear Curriculum" />
      </form>
    </div>
  );
}
