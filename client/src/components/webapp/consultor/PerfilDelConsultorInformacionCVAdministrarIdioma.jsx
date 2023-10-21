/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";

// COMPONENTES A USAR
import ButtonSubmit from "../global/ButtonSubmit";
import BackSection from "../global/BackSection";

// AYUDAS A USAR
import {
  listOfLanguages,
  listOfLevelLanguages,
} from "../../../helpers/Selectores";

// HOOKS A USAR
import useDisabled from "../../../hooks/useDisabled";
import useDataLanguage from "../../../hooks/consultor/useDataLanguage";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionCVAgregarIdioma.css";

export default function PerfilDelConsultorInformacionCVAgregarIdioma({
  changeMenu,
  setCheckCV,
  checkCV,
  setElementID,
}) {
  const { isDisabled, submitDisabled } = useDisabled();
  const { register, handleSubmit } = useForm({
    criteriaMode: "all",
  });
  const { addLanguageConsultant, backSectionHeaderProps } = useDataLanguage({
    setCheckCV,
    checkCV,
    submitDisabled,
    changeMenu,
    setElementID,
  });

  const addLanguage = handleSubmit(async (data) => {
    submitDisabled();
    addLanguageConsultant(data);
  });

  return (
    <form
      className="Main__Profile__Information--Content--CVLanguage--Add"
      onSubmit={addLanguage}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <BackSection {...backSectionHeaderProps} setElementID={setElementID}>
        Regresar
      </BackSection>
      <p className="Main__Profile__Information--Content--CVLanguage--Add--TitleInput">
        Selecciona el idioma y el nivel:
      </p>
      <span className="Main__Profile__Information--Content--CVLanguage--Add--ContainerInputs">
        <select
          {...register("nameLanguage")}
          className="Main__Profile__Information--Content--CVLanguage--Add--ContainerInputs--Inputs"
        >
          {listOfLanguages}
        </select>
        <select
          {...register("levelLanguage")}
          className="Main__Profile__Information--Content--CVLanguage--Add--ContainerInputs--Inputs"
        >
          {listOfLevelLanguages}
        </select>
      </span>
      <ButtonSubmit isDisabled={isDisabled} text="Agregar Idioma" />
    </form>
  );
}
