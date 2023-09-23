import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useGlobal();
  const navigate = useNavigate();

  const ERROR_MESSAGES = {
    INEXISTENTE: "¡Oops! Uno de los datos es incorrecto.",
    SERVER_ERROR:
      "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
  };

  const handleSuccessResponse = (res) => {
    toast.success(`¡Bienvenido ${res.userName}!`);
    setTimeout(() => {
      navigate("/Profile");
    }, 3000);
    return;
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case "INEXISTENTE":
        toast.error(ERROR_MESSAGES.INEXISTENTE);
        break;
      case "ERROR":
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
        break;
      default:
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  const checkDataLogin = handleSubmit(async (data) => {
    const res = await login(data);
    if (res._id) {
      return handleSuccessResponse(res);
    } else if (res.response) {
      return handleErrorResponse(res.response.data[0]);
    } else {
      return toast.error(ERROR_MESSAGES.SERVER_ERROR);
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
