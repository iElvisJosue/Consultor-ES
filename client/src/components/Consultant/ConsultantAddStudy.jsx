/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { listOfMonths, listOfYears } from "../../global/globalFunctions";
import { Toaster, toast } from "sonner";

export default function ConsultantAddStudy({
  setCheckCV,
  checkCV,
  setSeeForm,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { addStudy } = useAuth();

  const addNewStudy = handleSubmit(async (data) => {
    try {
      await addStudy(data);
      toast.success("¡Educación agregada correctamente!");
      setSeeForm(false);
      setCheckCV(!checkCV);
      reset();
    } catch (error) {
      toast.error(
        "Ha ocurrido un error al agregar la educación. Inténtalo de nuevo más tarde."
      );
      console.log(error);
    }
  });

  return (
    <form onSubmit={addNewStudy} className="AddStudy">
      <p>Nombre de la institución:</p>
      <input type="text" {...register("institution", { required: true })} />
      {errors.institution && (
        <p
          style={{
            color: "red",
          }}
        >
          El nombre es obligatorio
        </p>
      )}
      <p>Nivel de educación</p>
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
      {errors.area && (
        <p
          style={{
            color: "red",
          }}
        >
          El área es obligatorio
        </p>
      )}
      <p>Fecha de inicio:</p>
      <span>
        <select {...register("studiesMonthStart", { required: true })}>
          {listOfMonths}
        </select>
        <select {...register("studiesYearStart", { required: true })}>
          {listOfYears}
        </select>
      </span>
      <p>Fecha de finalización:</p>
      <span>
        <select {...register("studiesMonthEnd", { required: true })}>
          {listOfMonths}
        </select>
        <select {...register("studiesYearEnd", { required: true })}>
          {listOfYears}
        </select>
      </span>
      <button type="submit">Agregar</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
