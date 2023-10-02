/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { handleResponseMessages } from "../../helpers/globalFunctions";

export default function ConsultantAddSkill({
  setCheckCV,
  checkCV,
  setSeeForm,
}) {
  const { register, handleSubmit, reset } = useForm();

  const { addSkill } = useConsultant();

  const addNewSkill = handleSubmit(async (data) => {
    try {
      const res = await addSkill(data);
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
    <form onSubmit={addNewSkill} className="AddArea">
      <h1>Escribe la habilidad:</h1>
      <input {...register("nameSkill", { required: true })} />
      <button type="submit">Agregar</button>
    </form>
  );
}
