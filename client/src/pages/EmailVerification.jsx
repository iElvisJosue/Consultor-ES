import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
// eslint-disable-next-line react/prop-types
export default function ConsultantEmailVerification({ title, role }) {
  const { register, handleSubmit } = useForm();
  const { registerConsultantEmail } = useAuth();
  const navigate = useNavigate();

  const ERROR_MESSAGES = {
    VERIFICADO: "¡El correo ya ha sido verificado!",
    INVALID_EMAIL: "El correo introducido es inválido.",
    SERVER_ERROR:
      "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
  };

  const handleSuccessResponse = () => {
    navigate(`/${role}CodeVerification`);
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
      const res = await registerConsultantEmail(data);

      if (res.data) {
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
