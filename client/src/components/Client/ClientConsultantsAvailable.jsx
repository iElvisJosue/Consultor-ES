/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useClient } from "../../context/ClientContext";

export default function ClientConsultantsAvailable({ clientInformation }) {
  const [consultants, setConsultants] = useState(false);
  const { getConsultantsAvailableForProject } = useClient();
  useEffect(() => {
    async function getConsultantsAvailable() {
      const { projectsClient } = clientInformation;
      if (projectsClient.length > 0) {
        const allAreas = getProjectAreas(projectsClient);
        const res = await getConsultantsAvailableForProject(allAreas);
        const finalData = res.data.flat();
        setConsultants(finalData);
      }
    }
    getConsultantsAvailable();
  }, []);

  const getProjectAreas = (projectsClient) => {
    const projectArea = [];
    projectsClient.map(({ areaProject }) => {
      return projectArea.push({ areaProject });
    });
    return projectArea;
  };

  if (consultants.length > 0) {
    console.log(consultants);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {consultants.map((information) => {
          return (
            <div
              key={information._id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                padding: 20,
                border: "1px solid black",
              }}
            >
              <p>
                El consultor:{" "}
                <b>
                  {information.ownerName} {information.ownerLastName}{" "}
                  {information.ownerMotherLastName}
                </b>
              </p>
              <p>
                Es una excelente opción para tu proyecto de área:{" "}
                <b>{information.nameArea}</b>
              </p>
              <div>
                {information.ownerResume.map(
                  ({ profession, description }, index) => {
                    return (
                      <div key={index}>
                        <p>
                          Su profesión es: <b>{profession}</b>
                        </p>
                        <p>
                          Su descripción es: <b>{description}</b>
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
              <div>
                {information.ownerExperience.map((e, index) => {
                  return (
                    <div key={index}>
                      <p>
                        <b>Trabajo en: </b> {e[Object.keys(e)].company}
                      </p>
                      <p>
                        <b>En la posición de: </b> {e[Object.keys(e)].position}
                      </p>
                      <p>
                        <b>Desde: </b> {e[Object.keys(e)].startDate}
                        <b> Hasta: </b> {e[Object.keys(e)].endDate}
                      </p>
                    </div>
                  );
                })}
              </div>
              <button>Contactar</button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h1>SIN PROYECTOS NO PODEMOS ASIGNAR CONSULTORES</h1>;
  }
}
