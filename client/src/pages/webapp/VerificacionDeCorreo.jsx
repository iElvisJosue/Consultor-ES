/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

// CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";

// COMPONENTES A USAR
import HeaderForm from "../../components/webapp/global/HeaderForm";
import ButtonSubmit from "../../components/webapp/global/ButtonSubmit";

// AYUDAS A USAR
import {
  emailVerificationHeaderProps,
  emailValidator,
} from "../../helpers/VerificacionDeCorreo";
import { handleResponseMessages } from "../../helpers/Respuestas";

// HOOKS A USAR
import useDisabled from "../../hooks/useDisabled";

// ESTILOS A USAR
import "../../styles/webapp/VerificacionDeCorreo.css";

export default function VerificacionDeCorreo({ role }) {
  const { isDisabled, submitDisabled } = useDisabled();
  const { registerEmail } = useGlobal();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const sendEmail = handleSubmit(async (data) => {
    submitDisabled();
    try {
      data.role = role;
      const res = await registerEmail(data);
      if (res.response) {
        const { status, data } = res.response;
        if (data.error) {
          const error = data.error[0];
          handleResponseMessages({ status, data: error });
        } else {
          handleResponseMessages({ status, data });
        }
      } else {
        navigate(`/${role}VerificacionDeCodigo`);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  return (
    <main className="Main__EmailVerification">
      <form
        onSubmit={sendEmail}
        className="Main__EmailVerification__Form"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <HeaderForm {...emailVerificationHeaderProps} />
        <div className="Main__EmailVerification__Form--ContainerInputs">
          <span className="Main__EmailVerification__Form--ContainerInputs--Icon">
            <ion-icon name="mail-outline"></ion-icon>
          </span>

          <input
            type="email"
            {...register("email", emailValidator)}
            className="Main__EmailVerification__Form--ContainerInputs--Inputs"
            placeholder="Correo"
            autoComplete="on"
          />
        </div>

        <ErrorMessage
          errors={errors}
          name="email"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <small
                key={type}
                className="Main__EmailVerification__Form--SmallError"
              >
                {message}
              </small>
            ))
          }
        />
        <ButtonSubmit text="Enviar código" isDisabled={isDisabled} />
      </form>
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
