import { useState } from "react";
import ConsultantInformationCV from "./ConsultantInformationCV";
import ConsultantInformationBank from "./ConsultantInformationBank";
import ConsultantInformationProjects from "./ConsultantInformationProjects";
import "../../styles/FormsConsultant.css";

/* eslint-disable react/prop-types */
export default function ConsultantInformation({
  email,
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const [dataInfo, setDataInfo] = useState("CV");

  const informationProps = {
    email,
    consultantInformation,
    setCheckCV,
    checkCV,
  };
  const informationSection = {
    CV: <ConsultantInformationCV {...informationProps} />,
    BANK: <ConsultantInformationBank {...informationProps} />,
    PROJECTS: <ConsultantInformationProjects {...informationProps} />,
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", position: "relative" }}>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button onClick={() => setDataInfo("CV")}>MI CURRICULUM</button>
        <button onClick={() => setDataInfo("BANK")}>
          INFORMACIÓN BANCARIA
        </button>
        <button onClick={() => setDataInfo("PROJECTS")}>
          PROYECTOS DISPONIBLES
        </button>
      </span>
      <br />
      <hr />
      <br />
      {informationSection[dataInfo]}
    </div>
  );
}
