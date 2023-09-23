import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
// eslint-disable-next-line react/prop-types
export default function ConsultantEmailVerification({ title, role }) {
  const { register, handleSubmit } = useForm();
  const { registerEmail } = useGlobal();
  const navigate = useNavigate();

  const ERROR_MESSAGES = {
    VERIFICADO: "¡El correo ya ha sido verificado!",
    INVALID_EMAIL: "El correo introducido es inválido.",
    SERVER_ERROR:
      "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
  };

  const handleSuccessResponse = () => {
    toast.success("¡El correo se ha enviado correctamente!");
    setTimeout(() => {
      return navigate(`/${role}CodeVerification`);
    }, 1500);
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case "VERIFICADO":
        toast.error(ERROR_MESSAGES.VERIFICADO);
        break;
      case "ERROR":
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
        break;
      default:
        toast.error(ERROR_MESSAGES.INVALID_EMAIL);
        break;
    }
  };

  const sendEmail = handleSubmit(async (data) => {
    try {
      data.role = role;
      const res = await registerEmail(data);

      if (res._id) {
        return handleSuccessResponse();
      } else if (res.response) {
        return handleErrorResponse(res.response.data[0]);
      } else {
        return toast.error(ERROR_MESSAGES.INVALID_EMAIL);
      }
    } catch (error) {
      return toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  });

  return (
    <main className="Main">
      <form onSubmit={sendEmail}>
        <p>{title} Ingresa tu correo</p>
        <input type="email" {...register("email", { required: true })} />
        <button type="submit">Enviar código</button>
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
