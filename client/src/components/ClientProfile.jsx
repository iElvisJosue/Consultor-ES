import { useClient } from "../context/ClientContext";
import { useForm } from "react-hook-form";
import { listOfSpecialtiesAreas } from "../helpers/globalFunctions";
import { Toaster, toast } from "sonner";

export default function ClientProfile() {
  const { addProject } = useClient();
  const { register, handleSubmit } = useForm();

  const addNewProject = handleSubmit(async (data) => {
    try {
      const res = await addProject(data);
      console.log(res);
      if (!res.response) {
        return toast.success("¡Proyecto agregado correctamente!");
      }
      toast.error("Ha ocurrido un error al agregar el proyecto");
    } catch (error) {
      console.log(error);
      toast.error("Ha ocurrido un error al agregar el proyecto");
    }
  });

  return (
    <form onSubmit={addNewProject}>
      <h1>AGREGAR NUEVO PROYECTO</h1>;<p>Nombre del proyecto:</p>
      <input type="text" {...register("nameProject", { required: true })} />
      <p>Detalles del proyecto:</p>
      <textarea {...register("detailsProject", { required: true })} />
      <p>Tiempo estimado: </p>
      <input
        {...register("timeProject", { required: true })}
        placeholder="1 mes"
      />
      <p>Área del proyecto:</p>
      <select {...register("areaProject", { required: true })}>
        {listOfSpecialtiesAreas}
      </select>
      <br />
      <br />
      <button type="submit">Agregar proyecto</button>
      <Toaster richColors position="top-right" />
    </form>
  );
}
