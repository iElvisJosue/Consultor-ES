/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";

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
      if (!res.response) {
        toast.success("¡Habilidad agregada correctamente!");
        setSeeForm(false);
        setCheckCV(!checkCV);
        reset();
      } else {
        toast.error(
          "¡Formato de datos incorrecto! Inténtalo de nuevo con otro nombre."
        );
      }
    } catch (error) {
      toast.error(
        "Ha ocurrido un error al agregar la habilidad. Inténtalo de nuevo más tarde."
      );
      console.log(error);
    }
  });

  return (
    <form onSubmit={addNewSkill} className="AddArea">
      <h1>Escribe la habilidad:</h1>
      <input {...register("nameSkill", { required: true })} />
      <button type="submit">Agregar</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
