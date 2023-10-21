/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Toaster } from "sonner";

// CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";
import { useConsultant } from "../../context/ConsultantContext";
import { useClient } from "../../context/ClientContext";

// COMPONENTES A USAR
import HeaderForm from "../../components/webapp/global/HeaderForm";
import ButtonSubmit from "../../components/webapp/global/ButtonSubmit";
import Loader from "../../components/webapp/global/Loader";

// HOOKS A USAR
import usePassword from "../../hooks/usePassword";
import useDisabled from "../../hooks/useDisabled";
import useLogout from "../../hooks/useLogout";

// AYUDAS A USAR
import { handleResponseMessages } from "../../helpers/Respuestas";
import {
  registerDataHeaderProps,
  registerInformationData,
} from "../../helpers/RegistroDeDatos";

// ESTILOS A USAR
import "../../styles/webapp/RegistroDeDatos.css";

export default function RegistroDeDatos({ role }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { updateUser, user } = useGlobal();
  const { registerConsultant } = useConsultant();
  const { registerClient } = useClient();
  const { isDisabled, submitDisabled } = useDisabled();
  const { logoutUser, loading } = useLogout();
  const { iconPassword } = usePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

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
      if (role === "Consultor") {
        const res = await registerConsultant(data);
        checkResult(res);
      }
      if (role === "Cliente") {
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
      logoutUser();
    }
  };

  return (
    <main className="Main__RegisterData">
      {loading ? (
        <Loader text="Redireccionando..." />
      ) : (
        <form
          onSubmit={updateUserData}
          className="Main__RegisterData__Form"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <HeaderForm {...registerDataHeaderProps(user.data.role)} />
          {registerInformationData[role].map(
            (
              { icon, inputType, inputName, placeholder, typeList, validator },
              index
            ) => {
              const commonInputProps = {
                type: inputType,
                ...register(inputName, validator),
                className: "Main__RegisterData__Form--ContainerInputs--Inputs",
                placeholder: placeholder,
              };

              return (
                <>
                  <div
                    className="Main__RegisterData__Form--ContainerInputs"
                    key={index}
                  >
                    <span className="Main__RegisterData__Form--ContainerInputs--Icon">
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
                          {inputType === "password" && iconPassword}
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
                  <ErrorMessage
                    errors={errors}
                    name={inputName}
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <small
                          key={type}
                          className="Main__RegisterData__Form--SmallError"
                        >
                          {message}
                        </small>
                      ))
                    }
                  />
                </>
              );
            }
          )}

          <label className="Main__RegisterData__Form--Terms">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="Main__RegisterData__Form--Terms--Checkbox"
              name="TyC"
            />
            <a
              href="./TyC.pdf"
              target="_blank"
              rel="noreferrer"
              className="Main__RegisterData__Form--Terms--Link"
            >
              Acepto los términos y condiciones
            </a>
          </label>
          <ButtonSubmit text="Registrarme" isDisabled={isDisabled} />
        </form>
      )}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
