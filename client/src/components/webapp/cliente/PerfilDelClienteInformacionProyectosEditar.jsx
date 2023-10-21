/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import BackSection from "../global/BackSection";
import ButtonSubmit from "../global/ButtonSubmit";

// HOOKS A USAR
import useUpdateProject from "../../../hooks/cliente/useUpdateProject";

// AYUDAS A USAR
import { listOfSpecialtiesAreas } from "../../../helpers/Selectores";
import { inputsCreateProject } from "../../../helpers/PerfilDelClienteInformacionCrearProyecto";

// ESTILOS A USAR
// SON LOS MISMOS QUE EL DE CREAR PROYECTO
import "../../../styles/webapp/PerfilDelClienteInformacionCrearProyecto.css";

export default function PerfilDelClienteInformacionProyectosEditar({
  clientInformation,
  setElementID,
  elementID,
  changeMenu,
  setCheckClient,
  checkClient,
}) {
  const { editClientProject } = useUpdateProject({
    changeMenu,
    setCheckClient,
    checkClient,
    elementID,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  useEffect(() => {
    const { projectsClient } = clientInformation.data;
    projectsClient.find(
      ({
        _id,
        nameProject,
        paymentProject,
        areaProject,
        timeProject,
        detailsProject,
      }) => {
        if (_id === elementID) {
          setValue("nameProject", nameProject);
          setValue("paymentProject", paymentProject);
          setValue("areaProject", areaProject);
          setValue("timeProject", timeProject);
          setValue("detailsProject", detailsProject);
        }
      }
    );
  }, []);

  return (
    <form
      className="Main__Profile__Information--Content--CreateProject"
      onSubmit={handleSubmit(editClientProject)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <BackSection
        changeMenu={changeMenu}
        setElementID={setElementID}
        nameMenu="Proyectos"
        imgUrl="./CrearProyecto.png"
        imgAlt="Editar Un Proyecto Logo"
        title="Editar Proyecto ✍️"
      >
        Regresar
      </BackSection>
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
      <ButtonSubmit text="Actualizar Proyecto" />
    </form>
  );
}
