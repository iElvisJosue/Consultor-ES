import { useForm } from "react-hook-form";
import { listOfSpecialtiesAreas } from "../../helpers/globalFunctions";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";

// eslint-disable-next-line react/prop-types
export default function ConsultantAddArea({ setCheckCV, checkCV, setSeeForm }) {
  const { register, handleSubmit, reset } = useForm();

  const ERROR_MESSAGES = {
    AGREGADA: "¡Área agregada correctamente!",
    EXISTENTE: "¡El área seleccionada ya existe en tu CV!",
    ERROR:
      "Ha ocurrido un error al agregar la área. Inténtalo de nuevo más tarde.",
  };

  const { addArea } = useConsultant();

  const addNewArea = handleSubmit(async (data) => {
    try {
      const res = await addArea(data);
      if (!res.response) {
        toast.success(ERROR_MESSAGES[res.data[0]]);
        setSeeForm(false);
        setCheckCV(!checkCV);
        reset();
      } else {
        toast.error(ERROR_MESSAGES.ERROR);
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.ERROR);
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
