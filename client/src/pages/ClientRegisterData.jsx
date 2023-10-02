import { useForm } from "react-hook-form";
import { useGlobal } from "../context/GlobalContext";
import { useClient } from "../context/ClientContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  listOfServices,
  listOfSector,
  listOfChallenges,
} from "../helpers/globalFunctions";
import { handleResponseMessages } from "../helpers/globalFunctions";

export default function ConsultantRegisterData() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { updateUser } = useGlobal();
  const { registerClient } = useClient();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const cookieName = "accessToken";

  const handleSuccessResponse = () => {
    setLoading(true);
    handleResponseMessages({
      status: 200,
      data: "Tu cuenta ha sido creada exitosamente. Te estamos redirigiendo...",
    });
    setTimeout(() => {
      Cookies.remove(cookieName);
      navigate("/Login");
    }, 3000);
  };

  const updateUserData = handleSubmit(async (data) => {
    if (!termsAccepted) {
      return handleResponseMessages({
        status: 400,
        data: "Para completar su registro, debe aceptar los términos y condiciones.",
      });
    }
    try {
      const res = await updateUser(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        registerClientData(data);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const registerClientData = async (data) => {
    try {
      const res = await registerClient(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        handleSuccessResponse();
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
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
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
