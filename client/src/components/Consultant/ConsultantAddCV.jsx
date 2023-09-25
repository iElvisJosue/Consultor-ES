import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { Toaster, toast } from "sonner";
import {
  listOfMonths,
  listOfYears,
  listOfSpecialtiesAreas,
} from "../../helpers/globalFunctions";

// eslint-disable-next-line react/prop-types
export default function ConsultantAddCV({ setCheckCV, checkCV }) {
  const { register, handleSubmit } = useForm();
  const { createResumeCV, updateStatusCV } = useConsultant();

  const ERROR_MESSAGES = {
    EXISTENTE: "Ya has creado un resumen de tu perfil profesional.",
    SERVER_ERROR:
      "Ha ocurrido un error en el servidor. Por favor, inténtalo de nuevo más tarde.",
  };

  const handleSuccessResponse = async () => {
    try {
      await updateStatusCV();
      toast.success("¡Resumen de tu perfil profesional creado!");
      setTimeout(() => {
        setCheckCV(!checkCV);
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case "EXISTENTE":
        toast.error(ERROR_MESSAGES.EXISTENTE);
        break;
      case "ERROR":
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
        break;
      default:
        toast.error(ERROR_MESSAGES.SERVER_ERROR);
    }
  };

  const addResumeCV = handleSubmit(async (data) => {
    const res = await createResumeCV(data);
    if (!res.data) {
      handleErrorResponse(res.response.data[0]);
      return;
    }
    handleSuccessResponse();
  });

  return (
    <main>
      <form onSubmit={addResumeCV}>
        <h1>Resumen de tu perfil profesional</h1>
        <p>Título breve de tu profesión:</p>
        <input type="text" {...register("profession", { required: true })} />
        <p>Descripción breve de tu perfil profesional:</p>
        <input type="text" {...register("description", { required: true })} />
        <h1>Agregar tu experiencia más relevante:</h1>
        <p>Puesto/Cargo:</p>
        <input type="text" {...register("position", { required: true })} />
        <p>Nombre de la empresa:</p>
        <input type="text" {...register("company", { required: true })} />
        <p>Resumen del cargo que desempeñaste:</p>
        <input type="text" {...register("resume", { required: true })} />
        <br />
        <br />
        <p>Fecha de inicio:</p>
        <span>
          <select {...register("experienceMonthStart", { required: true })}>
            {listOfMonths}
          </select>
          <select {...register("experienceYearStart", { required: true })}>
            {listOfYears}
          </select>
        </span>
        <br />
        <p>Fecha de finalización:</p>
        <span>
          <select {...register("experienceMonthEnd", { required: true })}>
            {listOfMonths}
          </select>
          <select {...register("experienceYearEnd", { required: true })}>
            {listOfYears}
          </select>
        </span>
        <h1>Agregar tu nivel de estudios:</h1>
        <p>Nombre de la institución:</p>
        <input type="text" {...register("institution", { required: true })} />
        <br />
        <br />
        <select {...register("educationLevel", { required: true })}>
          <option value="Educación Superior - Licenciatura" defaultValue={true}>
            Educación Superior - Licenciatura
          </option>
          <option value="Educación Superior - Especialidad">
            Educación Superior - Especialidad
          </option>
          <option value="Educación Superior - Maestría">
            Educación Superior - Maestría
          </option>
          <option value="Educación Superior - Doctorado">
            Educación Superior - Doctorado
          </option>
        </select>
        <p>Área profesional</p>
        <input type="text" {...register("area", { required: true })} />
        <br />
        <br />
        <p>Fecha de inicio:</p>
        <span>
          <select {...register("studiesMonthStart", { required: true })}>
            {listOfMonths}
          </select>
          <select {...register("studiesYearStart", { required: true })}>
            {listOfYears}
          </select>
        </span>
        <br />
        <br />
        <p>Fecha de finalización:</p>
        <span>
          <select {...register("studiesMonthEnd", { required: true })}>
            {listOfMonths}
          </select>
          <select {...register("studiesYearEnd", { required: true })}>
            {listOfYears}
          </select>
        </span>
        <h1>Selecciona tus areas de especialidad:</h1>
        <select {...register("nameArea", { required: true })}>
          {listOfSpecialtiesAreas}
        </select>
        <br />
        <br />
        <button type="submit">Finalizar</button>
      </form>

      <Toaster richColors position="top-right" />
    </main>
  );
}
