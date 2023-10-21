/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import ButtonSubmit from "../global/ButtonSubmit";
import BackSection from "../global/BackSection";

// AYUDAS A USAR
import { resumeInformationData } from "../../../helpers/PerfilDelConsultorAgregarCV";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useDataResume from "../../../hooks/consultor/useDataResume";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionCVEditarResume.css";
export default function PerfilDelConsultorInformacionCVEditarResume({
  consultantInformation,
  changeMenu,
  setCheckCV,
  checkCV,
  setElementID,
}) {
  const { updateResumeConsultant, backSectionHeaderProps } = useDataResume({
    consultantInformation,
    changeMenu,
    setCheckCV,
    checkCV,
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
    setValue(
      "profession",
      consultantInformation.data.consultantResume.profession
    );
    setValue(
      "description",
      consultantInformation.data.consultantResume.description
    );
  }, []);

  const handleResumeConsultant = handleSubmit(async (data) => {
    submitDisabled();
    updateResumeConsultant(data);
  });

  return (
    <form
      className="Main__Profile__Information--Content--CVResume--Edit"
      onSubmit={handleResumeConsultant}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <BackSection {...backSectionHeaderProps} setElementID={setElementID}>
        Regresar
      </BackSection>
      {resumeInformationData.map(
        ({ icon, inputType, inputName, placeholder, validator }, index) => (
          <>
            <p className="Main__Profile__Information--Content--CVResume--Edit--TitleInput">
              {placeholder}:
            </p>
            <div className="Main__Profile__Information--Content--CVResume--Edit--ContainerInputs">
              <span className="Main__Profile__Information--Content--CVResume--Edit--ContainerInputs--Icon">
                <ion-icon name={icon}></ion-icon>
              </span>

              {index === 0 ? (
                <input
                  type={inputType}
                  {...register(inputName, validator)}
                  className="Main__Profile__Information--Content--CVResume--Edit--ContainerInputs--Inputs"
                  placeholder="Escribe aquí..."
                />
              ) : (
                <textarea
                  type={inputType}
                  {...register(inputName, validator)}
                  className="Main__Profile__Information--Content--CVResume--Edit--ContainerInputs--Inputs Textarea"
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
                    className="Main__Profile__Information--Content--CVResume--Edit--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <ButtonSubmit isDisabled={isDisabled} text="Actualizar Resumen" />
    </form>
  );
}
