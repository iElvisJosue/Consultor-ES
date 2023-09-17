import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import Cookies from "js-cookie";

export default function ConsultantRegisterData() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { registerConsultant, updateUser } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const cookieName = "accessToken";
  const ERROR_MESSAGES = {
    RFC: "¡El RFC introducido ya esta registrado!",
    EXISTENTE: "El nombre de usuario ya existe, por favor intente con otro.",
    ACTIVO:
      "¡Este usuario ya tiene una cuenta activa, por favor inicie sesión.",
    TYC: "¡Debe aceptar los términos y condiciones!",
    SERVER_ERROR:
      "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
  };

  const handleSuccessResponse = () => {
    setLoading(true);
    toast.success("¡Usuario registrado correctamente!");
    setTimeout(() => {
      Cookies.remove(cookieName);
      navigate("/Login");
    }, 3000);
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case "RFC":
        toast.error(ERROR_MESSAGES.RFC);
        break;
      case "EXISTENTE":
        toast.error(ERROR_MESSAGES.EXISTENTE);
        break;
      case "TYC":
        toast.error(ERROR_MESSAGES.TYC);
        break;
      default:
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
        break;
    }
  };

  const updateUserData = handleSubmit(async (data) => {
    if (!termsAccepted) {
      handleErrorResponse("TYC");
      return;
    }
    const res = await updateUser(data);
    if (!res.data) {
      handleErrorResponse(res.response.data[0]);
      return;
    }
    registerConsultantData(data);
  });

  const registerConsultantData = async (data) => {
    const res = await registerConsultant(data);
    if (res.data) {
      handleSuccessResponse();
    } else if (res.response) {
      handleErrorResponse(res.response.data[0]);
    } else {
      toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  return (
    <main className="Main">
      {loading ? (
        <h1>Guardando datos..</h1>
      ) : (
        <form onSubmit={updateUserData}>
          <p>Ingresa tu nombre de usuario:</p>
          <input type="text" {...register("userName", { required: true })} />
          <p>Ingresa tu contraseña:</p>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          <br />
          <p>Ingresa tu nombre:</p>
          <input type="text" {...register("name", { required: true })} />
          <p>Ingresa tu apellido:</p>
          <input type="text" {...register("lastName", { required: true })} />
          <p>Ingresa tu apellido materno:</p>
          <input
            type="text"
            {...register("motherLastName", { required: true })}
          />
          <p>Ingresa tu RFC</p>
          <input type="text" {...register("RFC", { required: true })} />
          <p>Ingresa tu número de teléfono</p>
          <input type="text" {...register("number", { required: true })} />
          <p>Ingresa tu perfil de LinkedIn (Opcional)</p>
          <input type="text" {...register("LinkedIn", { required: false })} />
          <br />
          <label>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            Acepto los{" "}
            <a
              href="./TyC.pdf"
              style={{
                fontWeight: "bold",
                textDecoration: "none",
              }}
              target="_blank"
            >
              términos y condiciones
            </a>
          </label>
          <br />
          <button type="submit">Registrarse</button>
        </form>
      )}
      <Toaster richColors position="top-right" />
    </main>
  );
}
