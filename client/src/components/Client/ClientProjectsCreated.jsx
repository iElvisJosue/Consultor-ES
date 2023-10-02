/* eslint-disable react/prop-types */
import { useClient } from "../../context/ClientContext";
import { listOfSpecialtiesAreas } from "../../helpers/globalFunctions";
import { useForm } from "react-hook-form";
import { handleResponseMessages } from "../../helpers/globalFunctions";

export default function ClientProjectsCreated({
  clientInformation,
  setInfoUpdated,
}) {
  const { addProject, deleteProject, completedProject } = useClient();
  const { register, handleSubmit, reset } = useForm();

  const addNewProject = handleSubmit(async (dataProject) => {
    try {
      const res = await addProject(dataProject);
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setInfoUpdated(false);
      reset();
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
    }
  });

  const handleProjectClient = async (id, actionProject) => {
    try {
      const res = await actionProject({ idProject: id });
      const { status, data } = res;
      handleResponseMessages({ status, data });
      setInfoUpdated(false);
    } catch (error) {
      const { status, data } = error.response;
      handleResponseMessages({ status, data });
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
                <button
                  onClick={() =>
                    handleProjectClient(project._id, deleteProject)
                  }
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
                <button
                  onClick={() =>
                    handleProjectClient(project._id, completedProject)
                  }
                >
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
