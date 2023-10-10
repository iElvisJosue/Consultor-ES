/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { listOfLanguages } from "../../helpers/globalFunctions";
import { useConsultant } from "../../context/ConsultantContext";
import { handleResponseMessages } from "../../helpers/globalFunctions";

export default function ConsultantAddLanguage({
  setCheckCV,
  checkCV,
  setSeeForm,
}) {
  const { register, handleSubmit, reset } = useForm();
  const { addLanguage } = useConsultant();

  const addNewLanguage = handleSubmit(async (data) => {
    try {
      const res = await addLanguage(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setSeeForm(false);
        setCheckCV(!checkCV);
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  return (
    <form onSubmit={addNewLanguage} className="AddLanguage">
      <button
        onClick={(e) => {
          e.preventDefault();
          setSeeForm(false);
        }}
      >
        Cerrar formulario
      </button>
      <h1>Selecciona el idioma y tu nivel:</h1>
      <select {...register("nameLanguage", { required: true })}>
        {listOfLanguages}
      </select>
      <select {...register("levelLanguage", { required: true })}>
        <option value="Múy básico" defaultValue={true}>
          Múy básico
        </option>
        <option value="Básico">Básico</option>
        <option value="Intermedio">Intermedio</option>
        <option value="Avanzado">Avanzado</option>
        <option value="Nativo">Nativo</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
}
