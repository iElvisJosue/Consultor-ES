/* eslint-disable react/prop-types */
import { useClient } from "../../context/ClientContext";
import { listOfSpecialtiesAreas } from "../../helpers/globalFunctions";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";

export default function ClientProjectsCreated({
  clientInformation,
  setInfoUpdated,
}) {
  const { addProject, deleteProject, completedProject } = useClient();
  const { register, handleSubmit, reset } = useForm();

  const TOAST_MESSAGES = {
    AGREGADO: "¡Proyecto agregado correctamente!",
    ELIMINADO: "¡Proyecto eliminado correctamente!",
    COMPLETADO: "¡Proyecto completado correctamente!",
    ERROR: "Ha ocurrido un error inesperado. Inténtalo de nuevo más tarde.",
  };

  const addNewProject = handleSubmit(async (data) => {
    try {
      const res = await addProject(data);
      if (!res.response) {
        toast.success(TOAST_MESSAGES.AGREGADO);
        setInfoUpdated(false);
        reset();
      } else {
        toast.error(TOAST_MESSAGES.ERROR);
      }
    } catch (error) {
      console.log(error);
      toast.error(TOAST_MESSAGES.ERROR);
    }
  });

  const deleteProjectClient = async (id) => {
    const res = await deleteProject({ idProject: id });
    checkResult(res, "ELIMINADO");
  };
  const completedProjectClient = async (id) => {
    const res = await completedProject({ idProject: id });
    checkResult(res, "COMPLETADO");
  };

  const checkResult = (res, MESSAGE) => {
    try {
      if (!res.response) {
        toast.success(TOAST_MESSAGES[MESSAGE]);
        setInfoUpdated(false);
      } else {
        toast.error(TOAST_MESSAGES.ERROR);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR);
    }
  };

  const hasProjects = clientInformation.projectsClient.length > 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <form
        onSubmit={addNewProject}
        style={{
          borderBottom: "1px solid black",
          padding: 20,
        }}
      >
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
      {hasProjects ? (
        clientInformation.projectsClient.map((project, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              border: "1px solid black",
              padding: 20,
            }}
          >
            <p>
              <b>Nombre del proyecto:</b> {project.nameProject}
            </p>
            <p>
              <b>Detalles del proyecto:</b> {project.detailsProject}
            </p>
            <p>
              <b>Tiempo estimado del proyecto:</b> {project.timeProject}
            </p>
            <p>
              <b>Area del proyecto:</b> {project.areaProject}
            </p>
            {project.isCompleted ? (
              <b style={{ color: "green" }}>PROYECTO COMPLETADO </b>
            ) : (
              <>
                <button onClick={() => deleteProjectClient(project._id)}>
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
                <button onClick={() => completedProjectClient(project._id)}>
                  <ion-icon name="checkmark-done-circle-outline"></ion-icon>
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <h1>NO HAY PROYECTOS</h1>
      )}
    </div>
  );
}
