import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { handleResponseMessages } from "../helpers/globalFunctions";
// eslint-disable-next-line react/prop-types
export default function ConsultantEmailVerification({ title, role }) {
  const { register, handleSubmit } = useForm();
  const { registerEmail } = useGlobal();
  const navigate = useNavigate();

  const sendEmail = handleSubmit(async (data) => {
    try {
      data.role = role;
      const res = await registerEmail(data);
      if (res.response) {
        const { status, data } = res.response;
        if (data.error) {
          const error = data.error[0];
          handleResponseMessages({ status, data: error });
        } else {
          handleResponseMessages({ status, data });
        }
      } else {
        navigate(`/${role}CodeVerification`);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
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
