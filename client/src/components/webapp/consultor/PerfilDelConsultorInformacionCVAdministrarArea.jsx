/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";

// COMPONENTES A USAR
import ButtonSubmit from "../global/ButtonSubmit";
import BackSection from "../global/BackSection";

// AYUDAS A USAR
import { skillsInformationData } from "../../../helpers/PerfilDelConsultorAgregarCV";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useDataArea from "../../../hooks/consultor/useDataArea";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionCVAgregarArea.css";

export default function PerfilDelConsultorInformacionCVAgregarArea({
  changeMenu,
  setCheckCV,
  checkCV,
  setElementID,
}) {
  const { isDisabled, submitDisabled } = useDisabled();
  const { register, handleSubmit } = useForm();
  const { addAreaConsultant, backSectionHeaderProps } = useDataArea({
    setCheckCV,
    checkCV,
    submitDisabled,
    changeMenu,
    setElementID,
  });

  const addNewArea = handleSubmit(async (data) => {
    submitDisabled();
    addAreaConsultant(data);
  });

  return (
    <form
      className="Main__Profile__Information--Content--CVArea--Add"
      onSubmit={addNewArea}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <BackSection {...backSectionHeaderProps} setElementID={setElementID}>
        Regresar
      </BackSection>
      {skillsInformationData.map(({ title, icon, inputName, typeList }) => (
        <>
          <p className="Main__Profile__Information--Content--CVArea--Add--TitleInput">
            {title}
          </p>
          <div className="Main__Profile__Information--Content--CVArea--Add--ContainerInputs">
            <span className="Main__Profile__Information--Content--CVArea--Add--ContainerInputs--Icon">
              <ion-icon name={icon}></ion-icon>
            </span>
            <select
              {...register(inputName)}
              className="Main__Profile__Information--Content--CVArea--Add--ContainerInputs--Inputs"
              style={{
                fontWeight: "bold",
              }}
            >
              {typeList}
            </select>
          </div>
        </>
      ))}
      <ButtonSubmit isDisabled={isDisabled} text="Agregar Especialidad" />
    </form>
  );
}
