/* eslint-disable react-hooks/exhaustive-deps */
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
import useUpdateClient from "../../../hooks/cliente/useUpdateClient";

// AYUDAS A USAR
import { inputsEditDataProfile } from "../../../helpers/PerfilnformacionPerfilEditar";
import { dateLastUpdate } from "../../../helpers/FormatoDeFecha";

// LOS ESTILOS DE ESTE COMPONENTE SON LOS MISMOS QUE EL DEL CONSULTOR

export default function PerfilDelClienteInformacionPerfilPersonal({
  dataClient,
  setCheckClient,
  checkClient,
}) {
  const { isDisabled, submitDisabled } = useDisabled();
  const { updateClientProfile } = useUpdateClient({
    setCheckClient,
    checkClient,
  });
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const lastUpdate = dateLastUpdate(dataClient.updatedAt);

  useEffect(() => {
    setValue("name", dataClient.name);
    setValue("lastName", dataClient.lastName);
    setValue("motherLastName", dataClient.motherLastName);
    setValue("number", dataClient.number);
  }, [dataClient]);

  const updatePersonalInformationClient = handleSubmit(async (data) => {
    submitDisabled();
    updateClientProfile(data);
  });
  return (
    <form
      className="Main__Profile__Information--Content--ProfileUser--Edit"
      onSubmit={updatePersonalInformationClient}
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
            ({ name, icon, title, type, validator }, innerIndex) => {
              if (name !== "LinkedIn") {
                return (
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
                );
              }
            }
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
