import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { handleResponseMessages } from "../helpers/globalFunctions";

// eslint-disable-next-line react/prop-types
export default function ConsultantCodeVerification({ role }) {
  const { register, handleSubmit } = useForm();
  const { checkVerificationCode } = useGlobal();
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
