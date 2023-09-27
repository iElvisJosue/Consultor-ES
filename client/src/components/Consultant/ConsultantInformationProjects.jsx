/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useConsultant } from "../../context/ConsultantContext";
import Loader from "../Loader";

export default function ConsultantInformationProjects({
  consultantInformation,
}) {
  const [loading, setLoading] = useState(true);
  const projectsList = useRef({});

  const { getProjectsAvailable } = useConsultant();

  useEffect(() => {
    async function getProjectsAvailableForConsultant() {
      if (consultantInformation.data.areasCV) {
        const listAreas = getListAreas();
        for (let i = 0; i < listAreas.length; i++) {
          const res = await getProjectsAvailable({
            nameArea: listAreas[i],
          });
          if (res.data[0]) {
            projectsList.current[`project${i}`] = res.data[0];
          }
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    getProjectsAvailableForConsultant();
  }, []);

  const getListAreas = () => {
    const allAreas = Object.values(consultantInformation.data.areasCV);
    const listAreas = allAreas.map(({ nameArea }) => nameArea);
    return listAreas;
  };

  if (!loading) {
    const amountProjects = Object.values(projectsList.current).length;
    const informationProject = Object.values(projectsList.current);

    return amountProjects > 0 ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {informationProject.map(
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
    ) : (
      <h1>NO HAY PROYECTOS</h1>
    );
  } else {
    return <Loader />;
  }
}
