import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useClient } from "../context/ClientContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  listOfServices,
  listOfSector,
  listOfChallenges,
} from "../helpers/globalFunctions";

export default function ConsultantRegisterData() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { updateUser } = useGlobal();
  const { registerClient } = useClient();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const cookieName = "accessToken";
  const ERROR_MESSAGES = {
    EXISTENTE: "El nombre de usuario ya existe, por favor intente con otro.",
    ACTIVO:
      "¡Este usuario ya tiene una cuenta activa, por favor inicie sesión.",
    TYC: "¡Debe aceptar los términos y condiciones!",
    NO_VERIFICADO:
      "Está acción no se puede completar porque tu correo no ha sido verificado. Verifica tu correo e intenta de nuevo.",
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
      case "EXISTENTE":
        toast.error(ERROR_MESSAGES.EXISTENTE);
        break;
      case "TYC":
        toast.error(ERROR_MESSAGES.TYC);
        break;
      case "SIN VERIFICAR":
        toast.error(ERROR_MESSAGES.NO_VERIFICADO, {
          action: {
            label: "Verificar",
            onClick: () => {
              navigate("/ClientCodeVerification");
            },
          },
        });
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
    registerClientData(data);
  });

  const registerClientData = async (data) => {
    const res = await registerClient(data);
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
          <p>Ingresa tu número de teléfono</p>
          <input type="text" {...register("number", { required: true })} />
          <p>Ingresa tu razón social</p>
          <input
            type="text"
            {...register("businessName", { required: true })}
          />
          <p>Selecciona el área en las que requiere el servicio</p>
          <select {...register("serviceArea", { required: true })}>
            {listOfServices}
          </select>
          <p>Selecciona el sector de tu empresa</p>
          <select {...register("businessSector", { required: true })}>
            {listOfSector}
          </select>
          <br />
          <p>Presupuesto aproximado por proyecto:</p>
          <input {...register("estimatedValue", { required: true })} />
          <br />
          <p>¿Qué retos te interesan?</p>
          <select {...register("challenges", { required: true })}>
            {listOfChallenges}
          </select>
          <br />
          <p>¿En qué te podemos ayudar?</p>
          <input {...register("helpMe", { required: true })} />
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
