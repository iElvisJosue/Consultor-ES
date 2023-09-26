import { useState } from "react";
import ConsultantInformationCV from "./ConsultantInformationCV";
import ConsultantInformationBank from "./ConsultantInformationBank";
import "../../styles/FormsConsultant.css";

/* eslint-disable react/prop-types */
export default function ConsultantInformation({
  email,
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const informationProps = {
    email,
    consultantInformation,
    setCheckCV,
    checkCV,
  };

  const [dataInfo, setDataInfo] = useState("CV");

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
      </span>
      <br />
      <hr />
      <br />
      {dataInfo === "CV" ? (
        <ConsultantInformationCV {...informationProps} />
      ) : (
        <ConsultantInformationBank {...informationProps} />
      )}
    </div>
  );
}
