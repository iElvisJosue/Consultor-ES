/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import ButtonSubmit from "../global/ButtonSubmit";
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";
import BackSection from "../global/BackSection";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useDataBank from "../../../hooks/consultor/useDataBank";

// AYUDAS A USAR
import { inputsAddBankProps } from "../../../helpers/PerfilDelConsultorInformacionBancoAgregar";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionBancoAgregar.css";

export default function PerfilDelConsultorInformacionBancoAgregar({
  consultantBank,
  setCheckCV,
  checkCV,
  changeMenu,
  nameMenu,
}) {
  const { isDisabled, submitDisabled } = useDisabled();
  const {
    addDataBankConsultant,
    updateDataBankConsultant,
    bankHeaderProps,
    textButton,
  } = useDataBank({
    setCheckCV,
    checkCV,
    submitDisabled,
    consultantBank,
    changeMenu,
    nameMenu,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (consultantBank) {
      setValue("account", consultantBank.account);
      setValue("bank", consultantBank.bank);
      setValue("name", consultantBank.name);
      setValue("RFC", consultantBank.RFC);
      setValue("country", consultantBank.country);
      setValue("address", consultantBank.address);
    }
  }, [consultantBank]);

  const verifyProcessDataBank = handleSubmit(async (data) => {
    if (consultantBank) {
      updateDataBankConsultant(data);
    } else {
      addDataBankConsultant(data);
    }
  });

  return (
    <form
      className="Main__Profile__Information--Content--AddBank"
      onSubmit={verifyProcessDataBank}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      {consultantBank ? (
        <TituloDeLaSeccion editable={false}>
          Tu Información Bancaria 💳
        </TituloDeLaSeccion>
      ) : (
        <BackSection {...bankHeaderProps} />
      )}
      {inputsAddBankProps.map((inputDetails, index) => (
        <div
          className="Main__Profile__Information--Content--AddBank--GroupInputs"
          key={index}
        >
          {inputDetails.map(
            ({ name, icon, title, type, validator }, innerIndex) => (
              <span
                key={innerIndex}
                className="Main__Profile__Information--Content--AddBank--GroupInputs--Container"
              >
                <p className="Main__Profile__Information--Content--AddBank--GroupInputs--Container--TitleInput">
                  {title}
                </p>
                <input
                  type={type}
                  {...register(name, validator)}
                  className="Main__Profile__Information--Content--AddBank--GroupInputs--Container--Inputs"
                  placeholder="Escribe aquí..."
                />
                <span className="Main__Profile__Information--Content--AddBank--GroupInputs--Container--Icon">
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
                        className="Main__Profile__Information--Content--AddBank--GroupInputs--Container--SmallError"
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
      <ButtonSubmit isDisabled={isDisabled} text={textButton} />
    </form>
  );
}
