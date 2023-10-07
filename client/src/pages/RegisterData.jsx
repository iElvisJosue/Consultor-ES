/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useConsultant } from "../context/ConsultantContext";
import { useClient } from "../context/ClientContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import {
  listOfServices,
  listOfSector,
  listOfChallenges,
} from "../helpers/globalFunctions";
import { handleResponseMessages } from "../helpers/globalFunctions";
import Cookies from "js-cookie";
import Loader from "../components/Loader";
import HeaderForm from "../components/Form/HeaderForm";
import ButtonSubmitForm from "../components/Form/ButtonSubmitForm";
import HandleStatusSubmitButton from "../hooks/submitButton";
import ShowPassword from "../hooks/showPassword";

import "../styles/RegisterData.css";

export default function ConsultantRegisterData({ role }) {
  const { isDisabled, submitDisabled } = HandleStatusSubmitButton();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUser, user } = useGlobal();
  const { registerConsultant } = useConsultant();
  const { registerClient } = useClient();
  const { iconInputPassword, changeInputPassword } = ShowPassword();

  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const cookieName = "accessToken";

  const handleSuccessResponse = () => {
    setLoading(true);
    setTimeout(() => {
      Cookies.remove(cookieName);
      navigate("/Login");
    }, 2000);
  };

  const updateUserData = handleSubmit(async (data) => {
    if (!termsAccepted) {
      return handleResponseMessages({
        status: 400,
        data: "Para completar su registro, debe aceptar los términos y condiciones.",
      });
    }
    submitDisabled();
    try {
      const res = await updateUser(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        registerData(data);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const registerData = async (data) => {
    try {
      if (role === "Consultant") {
        const res = await registerConsultant(data);
        checkResult(res);
      }
      if (role === "Client") {
        const res = await registerClient(data);
        checkResult(res);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  };

  const checkResult = (res) => {
    if (res.response) {
      const { status, data } = res.response;
      handleResponseMessages({ status, data });
    } else {
      handleSuccessResponse();
    }
  };

  const registerDataHeaderProps = {
    url: `./${user.data.role}CodeVerification`,
    imgUrl: "./InformacionPersonal.png",
    imgAlt: "Información personal Logo",
    title: "Ingresa tus datos personales para finalizar tu registro. ✍️",
  };

  const sharedFields = [
    {
      icon: "person-outline",
      inputType: "text",
      inputName: "userName",
      placeholder: "Nombre de usuario",
      messageError: "El nombre de usuario es requerido. ⚠️",
    },
    {
      icon: "lock-closed-outline",
      inputType: "password",
      inputName: "password",
      placeholder: "Contraseña",
      messageError: "La contraseña es requerida. ⚠️",
    },
    {
      icon: "person-circle-outline",
      inputType: "text",
      inputName: "name",
      placeholder: "Nombre(s)",
      messageError: "El nombre es requerido. ⚠️",
    },
    {
      icon: "person-circle-outline",
      inputType: "text",
      inputName: "lastName",
      placeholder: "Apellido paterno",
      messageError: "El apellido paterno es requerido. ⚠️",
    },
    {
      icon: "person-circle-outline",
      inputType: "text",
      inputName: "motherLastName",
      placeholder: "Apellido materno",
      messageError: "El apellido materno es requerido. ⚠️",
    },
    {
      icon: "call-outline",
      inputType: "text",
      inputName: "number",
      placeholder: "Número de teléfono",
      messageError: "El número es requerido. ⚠️",
    },
  ];

  const registerInformationData = {
    Consultant: [
      ...sharedFields,
      {
        icon: "logo-linkedin",
        inputType: "text",
        inputName: "LinkedIn",
        placeholder: "Perfil de LinkedIn (Opcional)",
        required: false,
      },
    ],
    Client: [
      ...sharedFields,
      {
        icon: "business-outline",
        inputType: "text",
        inputName: "businessName",
        placeholder: "Razón social",
        messageError: "La razón social es requerida. ⚠️",
      },
      {
        icon: "keypad-outline",
        inputType: "select",
        inputName: "serviceArea",
        messageError: "El área de servicio es requerida. ⚠️",
        typeList: listOfServices,
      },
      {
        icon: "keypad-outline",
        inputType: "select",
        inputName: "businessSector",
        messageError: "El sector de la empresa es requerido. ⚠️",
        typeList: listOfSector,
      },
      {
        icon: "cash-outline",
        inputType: "number",
        inputName: "estimatedValue",
        placeholder: "Presupuesto",
        messageError: "El presupuesto es requerido. ⚠️",
      },
      {
        icon: "extension-puzzle-outline",
        inputType: "select",
        inputName: "challenges",
        messageError: "El reto es requerido. ⚠️",
        typeList: listOfChallenges,
      },
      {
        icon: "help-circle-outline",
        inputType: "text",
        inputName: "helpMe",
        placeholder: "¿En qué te podemos ayudar?",
        messageError: "Este campo es requerido. ⚠️",
      },
    ],
  };

  return (
    <main className="Main__RegisterData">
      {loading ? (
        <Loader text="Redireccionando..." />
      ) : (
        <form
          onSubmit={updateUserData}
          className="Main__Form RegisterData"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <HeaderForm {...registerDataHeaderProps} />
          {registerInformationData[role].map(
            ({
              icon,
              inputType,
              inputName,
              messageError,
              placeholder,
              required = true,
              typeList,
            }) => {
              const commonInputProps = {
                type: inputType,
                ...register(inputName, { required: required }),
                className: "Main__Form--Inputs RegisterData",
                placeholder: placeholder,
              };

              return (
                <>
                  <div className="Main__Form--ContainerInputs">
                    <span className="Main__Form--Inputs--Icon">
                      <ion-icon name={icon}></ion-icon>
                    </span>
                    <>
                      {inputType === "select" && (
                        <select
                          {...commonInputProps}
                          style={{ fontWeight: "bold" }}
                        >
                          {typeList}
                        </select>
                      )}

                      {["text", "number", "password"].includes(inputType) && (
                        <>
                          {inputType === "password" && (
                            <span
                              className="Main__Form--Inputs--Icon Eye"
                              onClick={changeInputPassword}
                            >
                              <ion-icon name={iconInputPassword}></ion-icon>
                            </span>
                          )}
                          <input
                            {...commonInputProps}
                            id={
                              inputType === "password" ? "password" : undefined
                            }
                          />
                        </>
                      )}
                    </>
                  </div>
                  {errors[inputName] && (
                    <small className="Main__Form--SmallError">
                      {messageError}
                    </small>
                  )}
                </>
              );
            }
          )}

          <label className="Main__Form--Terms">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="Main__Form--Terms--Checkbox"
            />
            <a
              href="./TyC.pdf"
              target="_blank"
              rel="noreferrer"
              className="Main__Form--Terms--Link"
            >
              Acepto los términos y condiciones
            </a>
          </label>
          <ButtonSubmitForm text="Registrarme" isDisabled={isDisabled} />
        </form>
      )}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
