import { useForm } from "react-hook-form";
import { listOfSpecialtiesAreas } from "../../helpers/globalFunctions";
import { useConsultant } from "../../context/ConsultantContext";
import { handleResponseMessages } from "../../helpers/globalFunctions";

// eslint-disable-next-line react/prop-types
export default function ConsultantAddArea({ setCheckCV, checkCV, setSeeForm }) {
  const { register, handleSubmit, reset } = useForm();

  const { addArea } = useConsultant();

  const addNewArea = handleSubmit(async (data) => {
    try {
      const res = await addArea(data);
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
    <form onSubmit={addNewArea} className="AddArea">
      <h1>Selecciona tus areas de especialidad:</h1>
      <select {...register("nameArea", { required: true })}>
        {listOfSpecialtiesAreas}
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
}
