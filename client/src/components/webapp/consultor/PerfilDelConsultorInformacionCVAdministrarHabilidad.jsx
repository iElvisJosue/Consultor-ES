/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// COMPONENTES A USAR
import ButtonSubmit from "../global/ButtonSubmit";
import BackSection from "../global/BackSection";

// AYUDAS A USAR
import { abilityInformationData } from "../../../helpers/PerfilDelConsultorAgregarCV";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useDataAbility from "../../../hooks/consultor/useDataAbility";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionCVAgregarHabilidad.css";

export default function PerfilDelConsultorInformacionCVAgregarHabilidad({
  changeMenu,
  setCheckCV,
  checkCV,
  setElementID,
}) {
  const { isDisabled, submitDisabled } = useDisabled();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const { addAbilityConsultant, backSectionHeaderProps } = useDataAbility({
    setCheckCV,
    checkCV,
    submitDisabled,
    changeMenu,
    setElementID,
  });

  const addAbility = handleSubmit(async (data) => {
    submitDisabled();
    addAbilityConsultant(data);
  });

  return (
    <form
      className="Main__Profile__Information--Content--CVAbility--Add"
      onSubmit={addAbility}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <BackSection {...backSectionHeaderProps} setElementID={setElementID}>
        Regresar
      </BackSection>
      {abilityInformationData.map(
        ({ icon, inputType, inputName, placeholder, validator }) => (
          <>
            <p className="Main__Profile__Information--Content--CVAbility--Add--TitleInput">
              Escribe tu habilidad:
            </p>
            <div className="Main__Profile__Information--Content--CVAbility--Add--ContainerInputs">
              <span className="Main__Profile__Information--Content--CVAbility--Add--ContainerInputs--Icon">
                <ion-icon name={icon}></ion-icon>
              </span>

              <input
                type={inputType}
                {...register(inputName, validator)}
                className="Main__Profile__Information--Content--CVAbility--Add--ContainerInputs--Inputs"
                placeholder={placeholder}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name={inputName}
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <small
                    key={type}
                    className="Main__Profile__Information--Content--CVAbility--Add--SmallError"
                  >
                    {message}
                  </small>
                ))
              }
            />
          </>
        )
      )}
      <ButtonSubmit isDisabled={isDisabled} text="Agregar Habilidad" />
    </form>
  );
}
