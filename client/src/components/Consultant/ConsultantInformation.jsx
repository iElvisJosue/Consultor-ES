import { useState } from "react";
import ConsultantInformationCV from "./ConsultantInformationCV";
import ConsultantInformationBank from "./ConsultantInformationBank";
import ConsultantInformationProjects from "./ConsultantInformationProjects";
import Navbar from "../Navbar";
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
    <>
      <Navbar navSection="consultantProfile" setDataInfo={setDataInfo} />
      {informationSection[dataInfo]}
    </>
  );
}
