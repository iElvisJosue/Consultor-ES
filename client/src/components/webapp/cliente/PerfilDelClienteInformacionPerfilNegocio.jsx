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
import useUpdateClientBusiness from "../../../hooks/cliente/useUpdateClientBusiness";

// AYUDAS A USAR
import { inputsEditDataBusiness } from "../../../helpers/PerfilnformacionPerfilEditar";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionPerfilNegocio.css";

export default function PerfilDelClienteInformacionPerfilNegocio({
  dataClient,
  setCheckClient,
  checkClient,
}) {
  const { isDisabled, submitDisabled } = useDisabled();
  const { updateBusinessClient } = useUpdateClientBusiness({
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

  useEffect(() => {
    setValue("businessName", dataClient.businessName);
    setValue("estimatedValue", dataClient.estimatedValue);
    setValue("helpMe", dataClient.helpMe);
    setValue("serviceArea", dataClient.serviceArea);
    setValue("businessSector", dataClient.businessSector);
    setValue("challenges", dataClient.challenges);
  }, [dataClient]);

  const updateBusinessInformationClient = handleSubmit(async (data) => {
    submitDisabled();
    updateBusinessClient(data);
  });
  return (
    <form
      className="Main__Profile__Information--Content--ProfileUser--Business"
      onSubmit={updateBusinessInformationClient}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <TituloDeLaSeccion editable={false}>
        Información De Negocio 🏢
      </TituloDeLaSeccion>
      {inputsEditDataBusiness.map((inputDetails, index) => (
        <div
          className="Main__Profile__Information--Content--ProfileUser--Business--GroupInputs"
          key={index}
        >
          {inputDetails.map(
            (
              { icon, inputType, inputName, title, typeList, validator },
              innerIndex
            ) => (
              <span
                key={innerIndex}
                className="Main__Profile__Information--Content--ProfileUser--Business--GroupInputs--Container"
              >
                <p className="Main__Profile__Information--Content--ProfileUser--Business--GroupInputs--Container--TitleInput">
                  {title}
                </p>
                {inputType === "text" ? (
                  <input
                    type={inputType}
                    {...register(inputName, validator)}
                    className="Main__Profile__Information--Content--ProfileUser--Business--GroupInputs--Container--Inputs"
                    placeholder="Escribe aquí..."
                  />
                ) : (
                  <select
                    {...register(inputName, validator)}
                    className="Main__Profile__Information--Content--ProfileUser--Business--GroupInputs--Container--Inputs"
                  >
                    {typeList}
                  </select>
                )}
                <span className="Main__Profile__Information--Content--ProfileUser--Business--GroupInputs--Container--Icon">
                  <ion-icon name={icon}></ion-icon>
                </span>
                <ErrorMessage
                  errors={errors}
                  name={inputName}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="Main__Profile__Information--Content--ProfileUser--Business--GroupInputs--Container--SmallError"
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
        text="Actualizar Información De Negocio"
      />
    </form>
  );
}
