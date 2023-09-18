import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const ERROR_MESSAGES = {
    INEXISTENTE: "¡Oops! Uno de los datos es incorrecto.",
    SERVER_ERROR:
      "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
  };

  const handleSuccessResponse = () => {
    toast.success("¡Bienvenido!");
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
    if (res.data) {
      return handleSuccessResponse();
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
        <p>Ingresa tu contraseña:</p>
        <input
          type="password"
          {...register("yourPassword", { required: true })}
        />
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
