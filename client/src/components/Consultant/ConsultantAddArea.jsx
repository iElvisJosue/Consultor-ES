import { useForm } from "react-hook-form";
import { listOfSpecialtiesAreas } from "../../helpers/globalFunctions";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";

// eslint-disable-next-line react/prop-types
export default function ConsultantAddArea({ setCheckCV, checkCV, setSeeForm }) {
  const { register, handleSubmit, reset } = useForm();

  const { addArea } = useConsultant();

  const addNewArea = handleSubmit(async (data) => {
    try {
      const res = await addArea(data);
      if (!res.response) {
        toast.success("¡Área agregada correctamente!");
        setSeeForm(false);
        setCheckCV(!checkCV);
        reset();
      } else {
        toast.error(
          "Ha ocurrido un error al agregar la área. Inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      toast.error(
        "Ha ocurrido un error al agregar la área. Inténtalo de nuevo más tarde."
      );
      console.log(error);
    }
  });

  return (
    <form onSubmit={addNewArea} className="AddArea">
      <h1>Selecciona tus areas de especialidad:</h1>
      <select {...register("nameArea", { required: true })}>
        {listOfSpecialtiesAreas}
      </select>
      <button type="submit">Agregar</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
