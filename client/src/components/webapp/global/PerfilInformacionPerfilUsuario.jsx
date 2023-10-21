/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { useEffect } from "react";

// CONTEXTOS A USAR
import { useGlobal } from "../../../context/GlobalContext";

// COMPONENTES A USAR
import TituloDeLaSeccion from "./TituloDeLaSeccion";

// AYUDAS A USAR
import { inputsShowDataUserProfile } from "../../../helpers/PerfilnformacionPerfilEditar";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilInformacionPerfilUsuario.css";

export default function PerfilInformacionPerfilUsuario() {
  const { user } = useGlobal();
  const { setValue, register } = useForm();
  useEffect(() => {
    setValue("userName", user.userName);
    setValue("email", user.email);
  }, []);
  return (
    <div className="Main__Profile__Information--Content--ProfileUser">
      <TituloDeLaSeccion editable={false}>
        Información De Usuario 👤
      </TituloDeLaSeccion>
      {inputsShowDataUserProfile.map((inputDetails, index) => (
        <div
          className="Main__Profile__Information--Content--ProfileUser--GroupInputs"
          key={index}
        >
          {inputDetails.map(({ name, icon, title, type }, innerIndex) => (
            <span
              key={innerIndex}
              className="Main__Profile__Information--Content--ProfileUser--GroupInputs--Container"
            >
              <p className="Main__Profile__Information--Content--ProfileUser--GroupInputs--Container--TitleInput">
                {title}
              </p>
              <input
                type={type}
                {...register(name)}
                className="Main__Profile__Information--Content--ProfileUser--GroupInputs--Container--Inputs"
              />
              <span className="Main__Profile__Information--Content--ProfileUser--GroupInputs--Container--Icon">
                <ion-icon name={icon}></ion-icon>
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
