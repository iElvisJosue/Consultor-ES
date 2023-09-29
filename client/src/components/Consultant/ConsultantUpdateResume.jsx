/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";

export default function ConsultantUpdateResume({
  setSeeForm,
  setCheckCV,
  checkCV,
  setUpdate,
  update,
  setId,
  consultantResume,
}) {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (consultantResume) {
      setValue("profession", consultantResume.profession);
      setValue("description", consultantResume.description);
    }
  }, [update]);

  const { updateResume } = useConsultant();

  const updateResumeConsultant = handleSubmit(async (data) => {
    try {
      const res = await updateResume(data);
      if (!res.response) {
        toast.success("¡Resumen del CV actualizado correctamente!");
        setSeeForm(false);
        setCheckCV(!checkCV);
        setUpdate(false);
        setId(null);
        reset();
      } else {
        toast.error(
          "Ha ocurrido un error al actualizar el resumen de tú CV. Inténtalo de nuevo más tarde."
        );
      }
    } catch (error) {
      toast.error(
        "Ha ocurrido un error al actualizar el resumen de tú CV. Inténtalo de nuevo más tarde."
      );
      console.log(error);
    }
  });

  return (
    <form onSubmit={updateResumeConsultant} className="UpdateResume">
      <h1>Resumen de tu perfil profesional</h1>
      <p>Título breve de tu profesión:</p>
      <input type="text" {...register("profession", { required: true })} />
      <p>Descripción breve de tu perfil profesional:</p>
      <input type="text" {...register("description", { required: true })} />
      <button type="submit">Actualizar resumen</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
