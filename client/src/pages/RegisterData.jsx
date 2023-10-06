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

import "../styles/RegisterData.css";

export default function ConsultantRegisterData({ role }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUser } = useGlobal();
  const { registerConsultant } = useConsultant();
  const { registerClient } = useClient();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const cookieName = "accessToken";

  const handleSuccessResponse = () => {
    setLoading(true);
    setTimeout(() => {
      Cookies.remove(cookieName);
      navigate("/Login");
    }, 1500);
  };

  const updateUserData = handleSubmit(async (data) => {
    if (!termsAccepted) {
      return handleResponseMessages({
        status: 400,
        data: "Para completar su registro, debe aceptar los términos y condiciones.",
      });
    }
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
  const iconInputPassword = showPassword ? "eye-off-outline" : "eye-outline";

  const registerDataHeaderProps = {
    url: "/ConsultantCodeVerification",
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
      secondIcon: true,
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
        inputName: "serviceArea",
        messageError: "El área de servicio es requerida. ⚠️",
        isSelect: true,
        typeList: listOfServices,
      },
      {
        icon: "keypad-outline",
        inputName: "businessSector",
        messageError: "El sector de la empresa es requerido. ⚠️",
        isSelect: true,
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
        inputName: "challenges",
        messageError: "El reto es requerido. ⚠️",
        isSelect: true,
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
        <Loader />
      ) : (
        <form onSubmit={updateUserData} className="Main__Form RegisterData">
          <HeaderForm {...registerDataHeaderProps} />
          {registerInformationData[role].map(
            ({
              icon,
              inputType,
              inputName,
              messageError,
              placeholder,
              secondIcon,
              required = true,
              isSelect = false,
              typeList,
            }) => (
              <>
                <div className="Main__Form--ContainerInputs">
                  <span className="Main__Form--Inputs--Icon">
                    <ion-icon name={icon}></ion-icon>
                  </span>
                  {secondIcon && (
                    <span
                      className="Main__Form--Inputs--Icon Eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <ion-icon name={iconInputPassword}></ion-icon>
                    </span>
                  )}
                  {isSelect ? (
                    <select
                      {...register(inputName, {
                        required: required,
                      })}
                      className="Main__Form--Inputs RegisterData"
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
                      className="Main__Form--Inputs RegisterData"
                      placeholder={placeholder}
                    />
                  )}
                </div>
                {errors[inputName] && (
                  <small className="Main__Form--SmallError">
                    {messageError}
                  </small>
                )}
              </>
            )
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
          <ButtonSubmitForm text="Registrarme" />
        </form>
      )}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
