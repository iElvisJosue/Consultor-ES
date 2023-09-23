import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

// eslint-disable-next-line react/prop-types
export default function ConsultantCodeVerification({ role }) {
  const { register, handleSubmit } = useForm();
  const { checkVerificationCode } = useGlobal();
  const navigate = useNavigate();

  const ERROR_MESSAGES = {
    VERIFICADO: "¡Este correo ya fue verificado!",
    INCORRECTO: "¡Oops! El código no es correcto.",
    SERVER_ERROR:
      "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
  };

  const handleSuccessResponse = () => {
    toast.success("¡Correo verificado correctamente!");
    setTimeout(() => {
      navigate(`/${role}RegisterData`);
    }, 3000);
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case "VERIFICADO":
        toast.error(ERROR_MESSAGES.VERIFICADO);
        break;
      case "INCORRECTO":
        toast.error(ERROR_MESSAGES.INCORRECTO);
        break;
      default:
        toast.error(ERROR_MESSAGES.INVALID_EMAIL);
        break;
    }
  };

  const validateCode = handleSubmit(async (codeEntered) => {
    try {
      const res = await checkVerificationCode(codeEntered);
      if (res.data) {
        handleSuccessResponse();
      } else if (res.response) {
        handleErrorResponse(res.response.data[0]);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  });

  return (
    <main className="Main">
      <form onSubmit={validateCode}>
        <p>Ingresa el código de verificación</p>
        <input type="text" {...register("codeEntered", { required: true })} />
        <button type="submit">Comprobar</button>
      </form>
      <Toaster richColors position="top-right" />
    </main>
  );
}
