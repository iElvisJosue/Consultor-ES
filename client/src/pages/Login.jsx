import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { handleResponseMessages } from "../helpers/globalFunctions";

export default function Login() {
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

  return (
    <main className="Main">
      <form onSubmit={checkDataLogin}>
        <p>Ingresa tu nombre de usuario:</p>
        <input type="text" {...register("yourUserName", { required: true })} />
        {errors.yourUserName && (
          <p
            style={{
              color: "red",
            }}
          >
            El nombre de usuario es requerido.
          </p>
        )}
        <p>Ingresa tu contraseña:</p>
        <input
          type="password"
          {...register("yourPassword", { required: true })}
        />
        {errors.yourPassword && (
          <p
            style={{
              color: "red",
            }}
          >
            La contraseña es requerida.
          </p>
        )}
        <br />
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>
      <br />
      <p>¿No tienes cuenta?</p>
      <br />
      <a href="/ConsultantEmailVerification">Registraste como consultor</a>
      <br />
      <p>ó</p>
      <a href="/ClientEmailVerification">Registraste como cliente</a>
      <Toaster richColors position="top-right" />
    </main>
  );
}
