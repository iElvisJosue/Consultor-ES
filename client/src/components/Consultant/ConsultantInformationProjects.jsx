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
      if (consultantInformation.data.areasCV) {
        const consultantAreas = getListAreas();
        const promises = consultantAreas.map((area) =>
          getProjectsAvailable({
            nameArea: area,
          })
        );
        const results = await Promise.all(promises);
        const projects = results.map((result) => result.data[0]);
        const filteredProjects = projects.filter(Boolean);
        setProjectsAvailable(filteredProjects);
      }
    }
    getProjectsAvailableForConsultant();
  }, []);

  const getListAreas = () => {
    const allAreas = Object.values(consultantInformation.data.areasCV);
    const listAreas = allAreas.map(({ nameArea }) => nameArea);
    return listAreas;
  };

  if (projectsAvailable) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {projectsAvailable.map(
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
              <h3>{detailsProject}</h3>
              <p>{areaProject}</p>
              <p>{timeProject}</p>
            </div>
          )
        )}
      </div>
    );
  } else {
    return <h1>No hay proyectos disponibles para ti</h1>;
  }
}
