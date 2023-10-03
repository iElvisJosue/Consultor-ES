import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { handleResponseMessages } from "../helpers/globalFunctions";
import "../styles/Login.css";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useGlobal();
  const navigate = useNavigate();

  const handleSuccessResponse = (res) => {
    toast.success(`¡Bienvenido ${res.userName}!`);
    setTimeout(() => {
      navigate("/Profile");
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

  const typeInputPassword = showPassword ? "text" : "password";
  const iconInputPassword = showPassword ? "eye-off-outline" : "eye-outline";

  return (
    <main className="Main__Login">
      <form onSubmit={checkDataLogin} className="Main__Login--Form">
        <a href="/" className="Main__Login--Form--Back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </a>
        <img
          src="./LogoConsultores.png"
          alt="Consultor-ES Logo"
          className="Main__Login--Form--Logo"
        />
        <h2 className="Main__Login--Form--Title">¡Hola de nuevo 👋!</h2>
        <hr />

        <div className="Main__Login--Form--Inputs">
          <span className="Main__Login--Form--Inputs--Icon">
            <ion-icon name="person-outline"></ion-icon>
          </span>
          <input
            type="text"
            {...register("yourUserName", { required: true })}
            className="Main__Inputs Login"
            placeholder="Usuario"
          />
        </div>
        {errors.yourUserName && (
          <small className="Main__Login--Form--Inputs--Error">
            El nombre de usuario es requerido. ⚠️
          </small>
        )}

        <div className="Main__Login--Form--Inputs">
          <span className="Main__Login--Form--Inputs--Icon">
            <ion-icon name="lock-closed-outline"></ion-icon>
          </span>
          <span
            className="Main__Login--Form--Inputs--Icon Eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            <ion-icon name={iconInputPassword}></ion-icon>
          </span>
          <input
            type={typeInputPassword}
            {...register("yourPassword", { required: true })}
            className="Main__Inputs Login"
            placeholder="Contraseña"
          />
        </div>
        {errors.yourPassword && (
          <small className="Main__Login--Form--Inputs--Error">
            La contraseña es requerida. ⚠️
          </small>
        )}
        <button type="submit" className="Main__Button">
          Iniciar sesión
        </button>
        <p className="Main__Login--Form--RegisterTitle">
          ¿No tienes cuenta? Crea una cuenta:{" "}
        </p>
        <span className="Main__Login--Form--Register">
          <small>
            <a href="/ConsultantEmailVerification">Consultor</a>
          </small>
          <small>|</small>
          <small>
            <a href="/ClientEmailVerification">Cliente</a>
          </small>
        </span>
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
