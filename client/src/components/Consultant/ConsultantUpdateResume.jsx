/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { useEffect } from "react";
import { handleResponseMessages } from "../../helpers/globalFunctions";

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

  const resumeUpdated = (res) => {
    const { status, data } = res;
    handleResponseMessages({ status, data });
    setCheckCV(!checkCV);
    setSeeForm(false);
    setUpdate(false);
    setId(null);
    reset();
  };

  const updateResumeConsultant = handleSubmit(async (data) => {
    try {
      const res = await updateResume(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        resumeUpdated(res);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  return (
    <form
      onSubmit={updateResumeConsultant}
      className="UpdateResume"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setSeeForm(false);
        }}
      >
        Cerrar formulario
      </button>
      <h1>Resumen de tu perfil profesional</h1>
      <p>Título breve de tu profesión:</p>
      <input type="text" {...register("profession", { required: true })} />
      <p>Descripción breve de tu perfil profesional:</p>
      <input type="text" {...register("description", { required: true })} />
      <button type="submit">Actualizar resumen</button>
    </form>
  );
}
