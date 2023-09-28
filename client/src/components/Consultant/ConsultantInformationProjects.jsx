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
        const data = consultantInformation.data.areasCV;
        const res = await getProjectsAvailable(data);
        console.log(res.data);
        const finalResult = res.data.flat();
        setProjectsAvailable(finalResult);
      }
    }
    getProjectsAvailableForConsultant();
  }, []);

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
            {
              nameProject,
              detailsProject,
              areaProject,
              timeProject,
              ownerName,
              ownerLastName,
              ownerMotherLastName,
            },
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
              <p>
                Proyecto de:{" "}
                {`${ownerName} ${ownerLastName} ${ownerMotherLastName}`}
              </p>
            </div>
          )
        )}
      </div>
    );
  } else {
    return <h1>No hay proyectos disponibles para ti</h1>;
  }
}
