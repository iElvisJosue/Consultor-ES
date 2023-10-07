import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { handleResponseMessages } from "../helpers/globalFunctions";
import HeaderForm from "../components/Form/HeaderForm";
import ButtonSubmitForm from "../components/Form/ButtonSubmitForm";
import HandleStatusSubmitButton from "../hooks/submitButton";

import "../styles/EmailVerification.css";
// eslint-disable-next-line react/prop-types
export default function ConsultantEmailVerification({ role }) {
  const { isDisabled, submitDisabled } = HandleStatusSubmitButton();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerEmail } = useGlobal();
  const navigate = useNavigate();

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
        navigate(`/${role}CodeVerification`);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const emailVerificationHeaderProps = {
    url: "./Login",
    imgUrl: "./EnviarEmail.png",
    imgAlt: "Enviar Email Icon",
    title: "Verificación de Correo Electrónico. 🖐️",
    subtitle:
      "(Enviaremos un código de 6 dígitos a tu correo para verificar tu cuenta)",
  };

  return (
    <main className="Main__EmailVerification">
      <form
        onSubmit={sendEmail}
        className="Main__Form EmailVerification"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <HeaderForm {...emailVerificationHeaderProps} />
        <div className="Main__Form--ContainerInputs">
          <span className="Main__Form--Inputs--Icon">
            <ion-icon name="mail-outline"></ion-icon>
          </span>

          <input
            type="email"
            {...register("email", { required: true })}
            className="Main__Form--Inputs EmailVerification"
            placeholder="Correo"
          />
        </div>
        {errors.email && (
          <small className="Main__Form--SmallError">
            El correo es requerido. ⚠️
          </small>
        )}
        <ButtonSubmitForm text="Enviar código" isDisabled={isDisabled} />
      </form>
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
