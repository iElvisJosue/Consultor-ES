import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { handleResponseMessages } from "../helpers/globalFunctions";
import HeaderForm from "../components/Form/HeaderForm";
import ButtonSubmitForm from "../components/Form/ButtonSubmitForm";
import ShowPassword from "../hooks/showPassword";

import "../styles/Login.css";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { login } = useGlobal();
  const navigate = useNavigate();
  const { iconInputPassword, changeInputPassword } = ShowPassword();

  const handleSuccessResponse = (res) => {
    toast.success(`¡Bienvenido ${res.userName}!`);
    setTimeout(() => {
      navigate("/Perfil");
    }, 3000);
    return;
  };

  const checkDataLogin = handleSubmit(async (data) => {
    try {
      const res = await login(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        handleSuccessResponse(res);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const loginHeaderProps = {
    url: "/",
    imgUrl: "./LogoConsultores.png",
    imgAlt: "Consultor-ES Logo",
    title: "¡Hola de nuevo 👋!",
  };
  const loginInputsPros = [
    {
      icon: "person-outline",
      inputType: "text",
      inputName: "yourUserName",
      placeholder: "Usuario",
      messageError: "El nombre de usuario es requerido. ⚠️",
      secondIcon: false,
    },
    {
      icon: "lock-closed-outline",
      inputType: "password",
      inputName: "yourPassword",
      placeholder: "Contraseña",
      messageError: "La contraseña es requerida. ⚠️",
      secondIcon: true,
    },
  ];

  return (
    <main className="Main__Login">
      <form onSubmit={checkDataLogin} className="Main__Form Login">
        <HeaderForm {...loginHeaderProps} />

        {loginInputsPros.map(
          ({
            icon,
            inputType,
            inputName,
            messageError,
            placeholder,
            secondIcon,
          }) => (
            <>
              <div className="Main__Form--ContainerInputs">
                <span className="Main__Form--Inputs--Icon">
                  <ion-icon name={icon}></ion-icon>
                </span>
                {secondIcon && (
                  <span
                    className="Main__Form--Inputs--Icon Eye"
                    onClick={changeInputPassword}
                  >
                    <ion-icon name={iconInputPassword}></ion-icon>
                  </span>
                )}
                {inputType === "text" ? (
                  <input
                    type={inputType}
                    {...register(inputName, { required: true })}
                    className="Main__Form--Inputs Login"
                    placeholder={placeholder}
                  />
                ) : (
                  <input
                    type={inputType}
                    {...register(inputName, { required: true })}
                    className="Main__Form--Inputs Login"
                    placeholder={placeholder}
                    id="password"
                  />
                )}
              </div>
              {errors[inputName] && (
                <small className="Main__Form--SmallError">{messageError}</small>
              )}
            </>
          )
        )}
        <ButtonSubmitForm text="Iniciar Sesión" />
        <p className="Main__Login--Form--RegisterTitle">
          ¿No tienes cuenta? Crea una:{" "}
        </p>
        <span className="Main__Login--Form--Register">
          <small>
            <a href="/ConsultorVerificacionDeCorreo">Consultor</a>
          </small>
          <small>|</small>
          <small>
            <a href="/ClienteVerificacionDeCorreo">Cliente</a>
          </small>
        </span>
      </form>
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
