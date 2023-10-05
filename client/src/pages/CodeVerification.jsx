import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { handleResponseMessages } from "../helpers/globalFunctions";
import HeaderForm from "../components/Form/HeaderForm";
import ButtonSubmitForm from "../components/Form/ButtonSubmitForm";

import "../styles/CodeVerification.css";

// eslint-disable-next-line react/prop-types
export default function ConsultantCodeVerification({ role }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { checkVerificationCode, user } = useGlobal();
  const navigate = useNavigate();

  const validateCode = handleSubmit(async (codeEntered) => {
    try {
      const res = await checkVerificationCode(codeEntered);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        navigate(`/${role}RegisterData`);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  console.log(user);

  const codeVerificationHeaderProps = {
    url: `./${user.data.role}EmailVerification`,
    imgUrl: "./EmailEnviado.png",
    imgAlt: "Email Enviado Icon",
    title: "Verificación de Correo Electrónico. 🖐️",
    subtitle: `Por favor ingresa el código de 6 dígitos que hemos enviado a ${user.data.email}. No olvides checar tu bandeja de SPAM.`,
  };

  return (
    <main className="Main__CodeVerification">
      <form onSubmit={validateCode} className="Main__Form CodeVerification">
        <HeaderForm {...codeVerificationHeaderProps} />
        <div className="Main__Form--ContainerInputs">
          <span className="Main__Form--Inputs--Icon">
            <ion-icon name="chatbox-ellipses-outline"></ion-icon>
          </span>

          <input
            type="text"
            {...register("codeEntered", { required: true })}
            className="Main__Form--Inputs EmailVerification"
            placeholder="Código de verificación"
            maxLength={6}
          />
        </div>
        {errors.codeEntered && (
          <small className="Main__Form--SmallError">
            El código es requerido. ⚠️
          </small>
        )}
        <ButtonSubmitForm text="Comprobar" />
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
