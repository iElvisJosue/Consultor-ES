import { useForm } from "react-hook-form";
import { useConsultant } from "../../context/ConsultantContext";
import { handleResponseMessages } from "../../helpers/globalFunctions";
import {
  listOfMonths,
  listOfYears,
  listOfSpecialtiesAreas,
} from "../../helpers/globalFunctions";

// eslint-disable-next-line react/prop-types
export default function ConsultantAddCV({ setCheckCV, checkCV }) {
  const { register, handleSubmit } = useForm();
  const { createResumeCV } = useConsultant();

  const addResumeCV = handleSubmit(async (data) => {
    try {
      const res = await createResumeCV(data);
      if (res.response) {
        const { status, data } = res.response;
        handleResponseMessages({ status, data });
      } else {
        const { status, data } = res;
        handleResponseMessages({ status, data });
        setTimeout(() => {
          setCheckCV(!checkCV);
        }, 1500);
      }
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
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
    </main>
  );
}
