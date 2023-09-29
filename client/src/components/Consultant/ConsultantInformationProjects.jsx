/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useConsultant } from "../../context/ConsultantContext";

export default function ConsultantInformationProjects({
  consultantInformation,
}) {
  const [projectsAvailable, setProjectsAvailable] = useState();
  const { getProjectsAvailable } = useConsultant();

  useEffect(() => {
    async function getProjectsAvailableForConsultant() {
      if (consultantInformation.data.consultantAreas) {
        const data = consultantInformation.data.consultantAreas;
        const res = await getProjectsAvailable(data);
        if (!res.data[0]) {
          setProjectsAvailable(res.data);
        }
      }
    }
    getProjectsAvailableForConsultant();
  }, []);

  if (projectsAvailable) {
    const { clientInformation, projectInformation } = projectsAvailable;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {projectInformation.map(
          (
            { nameProject, detailsProject, areaProject, timeProject },
            index
          ) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                padding: 20,
                border: "1px solid black",
              }}
            >
              <h1>{nameProject}</h1>
              <h3>
                <b>Detalles del proyecto: </b>
                {detailsProject}
              </h3>
              <p>
                <b>Area del proyecto: </b>
                {areaProject}
              </p>
              <p>
                <b>Tiempo estimado: </b>
                {timeProject}
              </p>
              <p>
                <b>Proyecto de:</b>{" "}
                {clientInformation[index].name +
                  " " +
                  clientInformation[index].lastName +
                  " " +
                  clientInformation[index].motherLastName}
              </p>
              <button>Contactar</button>
            </div>
          )
        )}
      </div>
    );
  } else {
    return <h1>No hay proyectos disponibles para ti</h1>;
  }
}
