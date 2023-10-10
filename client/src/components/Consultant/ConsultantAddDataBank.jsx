/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { useEffect } from "react";
import { handleResponseMessages } from "../../helpers/globalFunctions";
import HeaderForm from "../../components/Form/HeaderForm";
import ButtonSubmitForm from "../../components/Form/ButtonSubmitForm";
import HandleStatusSubmitButton from "../../hooks/submitButton";

import "../../styles/ConsultantAddDataBank.css";

export default function ConsultantAddDataBank({
  setUpdateDataBank,
  consultantBank,
  setCheckCV,
  checkCV,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { registerDataBank, updateDataBank } = useConsultant();
  const { isDisabled, submitDisabled } = HandleStatusSubmitButton();

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

  const textButton = consultantBank ? "Actualizar" : "Agregar";
  const verifyProcessDataBank = handleSubmit(async (data) => {
    if (consultantBank) {
      updateDataBankConsultant(data);
    } else {
      addDataBankConsultant(data);
    }
  });

  const handleError = (error) => {
    const { status, data } = error.response;
    handleResponseMessages({ status, data });
  };
  const addDataBankConsultant = async (data) => {
    submitDisabled();
    try {
      const res = await registerDataBank(data);
      checkResult(res);
    } catch (error) {
      handleError(error);
    }
  };

  const classFormDataBank = consultantBank
    ? "Main__Form UpdateDataBank"
    : "Main__Form AddDataBank";

  const updateDataBankConsultant = async (data) => {
    submitDisabled();
    try {
      const res = await updateDataBank(data);
      checkResult(res);
    } catch (error) {
      handleError(error);
    }
  };
  const checkResult = (res) => {
    if (res.response) {
      const { status, data } = res.response;
      handleResponseMessages({ status, data });
    } else {
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setCheckCV(!checkCV);
      setUpdateDataBank(false);
    }
  };

  const addDataBankHeaderProps = {
    imgUrl: "./InformacionBancaria.png",
    imgAlt: "Información Bancaria Logo",
    title: "Agrega tus datos bancarios. 💳",
  };
  const updateDataBankHeaderProps = {
    imgUrl: "./ActualizarInformacionBancaria.png",
    imgAlt: "Actualizar Información Bancaria Logo",
    title: "Actualiza tus datos bancarios. 🔄",
  };
  const addDataBankInformation = [
    {
      icon: "card-outline",
      inputName: "account",
      maxLength: 20,
      placeholder: "Número de cuenta o clabe",
      messageError: "El número de cuenta o clabe es requerido. ⚠️",
    },
    {
      icon: "business-outline",
      inputName: "bank",
      placeholder: "Institución bancaria",
      messageError: "El nombre de la institución es requerido. ⚠️",
    },
    {
      icon: "person-outline",
      inputName: "name",
      placeholder: "Nombre del derechohabiente",
      messageError: "El nombre del derechohabiente es requerido. ⚠️",
    },
    {
      icon: "id-card-outline",
      inputName: "RFC",
      maxLength: 16,
      placeholder: "RFC",
      messageError: "El RFC es requerido. ⚠️",
    },
    {
      icon: "earth-outline",
      inputName: "country",
      placeholder: "País de residencia",
      messageError: "El país de residencia es requerido. ⚠️",
    },
    {
      icon: "location-outline",
      inputName: "address",
      placeholder: "Domicilio fiscal",
      messageError: "El domicilio fiscal es harmonido. ⚠️",
    },
  ];

  return (
    <form
      onSubmit={verifyProcessDataBank}
      className={classFormDataBank}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      {consultantBank ? (
        <HeaderForm {...updateDataBankHeaderProps} />
      ) : (
        <HeaderForm {...addDataBankHeaderProps} />
      )}
      {addDataBankInformation.map(
        (
          { icon, inputName, placeholder, messageError, maxLength = 100 },
          index
        ) => (
          <>
            <div className="Main__Form--ContainerInputs" key={index}>
              <span className="Main__Form--Inputs--Icon">
                <ion-icon name={icon}></ion-icon>
              </span>
              <input
                type="text"
                {...register(inputName, { required: true })}
                className="Main__Form--Inputs AddDataBank"
                placeholder={placeholder}
                maxLength={maxLength}
              />
            </div>
            {errors[inputName] && (
              <small className="Main__Form--SmallError">{messageError}</small>
            )}
          </>
        )
      )}
      {consultantBank ? (
        <span className="Main__Form--GroupButtons">
          <button
            className="Main__Form--ButtonSubmit"
            onClick={(e) => {
              e.preventDefault();
              setUpdateDataBank(false);
            }}
          >
            Regresar
          </button>
          <ButtonSubmitForm text={textButton} isDisabled={isDisabled} />
        </span>
      ) : (
        <ButtonSubmitForm
          text={`${textButton} datos bancarios`}
          isDisabled={isDisabled}
        />
      )}
    </form>
  );
}
