/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

// CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";

// COMPONENTES A USAR
import HeaderForm from "../../components/webapp/global/HeaderForm";
import ButtonSubmit from "../../components/webapp/global/ButtonSubmit";
import Loader from "../../components/webapp/global/Loader";

// HOOKS A USAR
import useDisabled from "../../hooks/useDisabled";

// AYUDAS A USAR
import { codeVerificationHeaderProps } from "../../helpers/VerificacionDeCodigo";
import { handleResponseMessages } from "../../helpers/Respuestas";

// ESTILOS A USAR
import "../../styles/webapp/VerificacionDeCodigo.css";

export default function VerificacionDeCodigo({ role }) {
  const [saving, setSaving] = useState(false);
  const { isDisabled, submitDisabled } = useDisabled();
  const { checkVerificationCode, user } = useGlobal();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateCode = handleSubmit(async (codeEntered) => {
    submitDisabled();
    try {
      const res = await checkVerificationCode(codeEntered);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        setSaving(true);
        setTimeout(() => {
          return navigate(`/${role}RegistroDeDatos`);
        }, 2000);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  if (saving) {
    return <Loader text="Guardando información..." />;
  } else {
    return (
      <main className="Main__CodeVerification">
        <form
          onSubmit={validateCode}
          className="Main__CodeVerification__Form"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          <HeaderForm
            {...codeVerificationHeaderProps({
              role,
              email: `${user.data.email}`,
            })}
          />
          <div className="Main__CodeVerification__Form--ContainerInputs">
            <span className="Main__CodeVerification__Form--ContainerInputs--Icon">
              <ion-icon name="chatbox-ellipses-outline"></ion-icon>
            </span>

            <input
              type="text"
              {...register("codeEntered", { required: true })}
              className="Main__CodeVerification__Form--ContainerInputs--Inputs"
              placeholder="Código de verificación"
              maxLength={6}
            />
          </div>
          {errors.codeEntered && (
            <small className="Main__CodeVerification__Form--SmallError">
              ¡Este campo es obligatorio! ⚠️
            </small>
          )}
          <ButtonSubmit text="Comprobar" isDisabled={isDisabled} />
        </form>
        <Toaster richColors position="top-right" closeButton />
      </main>
    );
  }
}
