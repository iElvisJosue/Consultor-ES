/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import BackSection from "../global/BackSection";
import ButtonSubmit from "../global/ButtonSubmit";

// HOOKS A USAR
import useCreateProject from "../../../hooks/cliente/useCreateProject";

// AYUDAS A USAR
import { listOfSpecialtiesAreas } from "../../../helpers/Selectores";
import { inputsCreateProject } from "../../../helpers/PerfilDelClienteInformacionCrearProyecto";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionCrearProyecto.css";

export default function PerfilDelClienteInformacionCrearProyecto({
  changeMenu,
  setCheckClient,
  checkClient,
}) {
  const { addNewProject } = useCreateProject({
    changeMenu,
    setCheckClient,
    checkClient,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  return (
    <form
      className="Main__Profile__Information--Content--CreateProject"
      onSubmit={handleSubmit(addNewProject)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <BackSection
        backButton={false}
        imgUrl="./CrearProyecto.png"
        imgAlt="Crear Un Proyecto Logo"
        title="Crea Un Proyecto 🗃️"
      />
      {inputsCreateProject.map((inputDetails, index) => (
        <div
          className="Main__Profile__Information--Content--CreateProject--GroupInputs"
          key={index}
        >
          {inputDetails.map(({ name, icon, title, type, validator }, index) => (
            <span
              key={index}
              className="Main__Profile__Information--Content--CreateProject--GroupInputs--Container"
            >
              <p className="Main__Profile__Information--Content--CreateProject--GroupInputs--Container--TitleInput">
                {title}
              </p>
              {type === "text" && (
                <input
                  type={type}
                  {...register(name, validator)}
                  className="Main__Profile__Information--Content--CreateProject--GroupInputs--Container--Inputs"
                  placeholder="Escribe aquí..."
                />
              )}
              {type === "textarea" && (
                <textarea
                  type={type}
                  {...register(name, validator)}
                  className="Main__Profile__Information--Content--CreateProject--GroupInputs--Container--Inputs Textarea"
                  placeholder="Escribe aquí..."
                />
              )}
              {type === "select" && (
                <select
                  {...register(name)}
                  className="Main__Profile__Information--Content--CreateProject--GroupInputs--Container--Inputs"
                >
                  {listOfSpecialtiesAreas}
                </select>
              )}

              <span className="Main__Profile__Information--Content--CreateProject--GroupInputs--Container--Icon">
                <ion-icon name={icon}></ion-icon>
              </span>
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <small
                      key={type}
                      className="Main__Profile__Information--Content--CreateProject--GroupInputs--Container--SmallError"
                    >
                      {message}
                    </small>
                  ))
                }
              />
            </span>
          ))}
        </div>
      ))}
      <ButtonSubmit text="Crear Proyecto" />
    </form>
  );
}
