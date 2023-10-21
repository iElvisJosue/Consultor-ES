/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";
import ButtonSubmit from "../global/ButtonSubmit";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useUpdateConsultant from "../../../hooks/consultor/useUpdateConsultant";

// AYUDAS A USAR
import { inputsEditDataProfile } from "../../../helpers/PerfilnformacionPerfilEditar";
import { dateLastUpdate } from "../../../helpers/FormatoDeFecha";

import "../../../styles/webapp/PerfilDelConsultorInformacionPerfilPersonal.css";

export default function PerfilDelConsultorInformacionPerfilPersonal({
  consultantPersonalData,
  setCheckCV,
  checkCV,
}) {
  const { isDisabled, submitDisabled } = useDisabled();
  const { updateConsultantProfile } = useUpdateConsultant({
    setCheckCV,
    checkCV,
  });
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const lastUpdate = dateLastUpdate(consultantPersonalData.updatedAt);

  useEffect(() => {
    setValue("name", consultantPersonalData.name);
    setValue("lastName", consultantPersonalData.lastName);
    setValue("motherLastName", consultantPersonalData.motherLastName);
    setValue("number", consultantPersonalData.number);
    setValue("LinkedIn", consultantPersonalData.LinkedIn);
  }, [consultantPersonalData]);

  const updatePersonalInformationConsultant = handleSubmit(async (data) => {
    submitDisabled();
    updateConsultantProfile(data);
  });
  return (
    <form
      className="Main__Profile__Information--Content--ProfileUser--Edit"
      onSubmit={updatePersonalInformationConsultant}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <small className="Main__Profile__Information--Content--ProfileUser--Edit--LastUpdate">
        <strong>Última actualización</strong> {lastUpdate}
      </small>
      <TituloDeLaSeccion editable={false}>
        Información Personal 📃
      </TituloDeLaSeccion>
      {inputsEditDataProfile.map((inputDetails, index) => (
        <div
          className="Main__Profile__Information--Content--ProfileUser--Edit--GroupInputs"
          key={index}
        >
          {inputDetails.map(
            ({ name, icon, title, type, validator }, innerIndex) => (
              <span
                key={innerIndex}
                className="Main__Profile__Information--Content--ProfileUser--Edit--GroupInputs--Container"
              >
                <p className="Main__Profile__Information--Content--ProfileUser--Edit--GroupInputs--Container--TitleInput">
                  {title}
                </p>
                <input
                  type={type}
                  {...register(name, validator)}
                  className="Main__Profile__Information--Content--ProfileUser--Edit--GroupInputs--Container--Inputs"
                  placeholder="Escribe aquí..."
                />
                <span className="Main__Profile__Information--Content--ProfileUser--Edit--GroupInputs--Container--Icon">
                  <ion-icon name={icon}></ion-icon>
                </span>
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="Main__Profile__Information--Content--ProfileUser--Edit--GroupInputs--Container--SmallError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </span>
            )
          )}
        </div>
      ))}
      <ButtonSubmit
        isDisabled={isDisabled}
        text="Actualizar Información Personal"
      />
    </form>
  );
}
