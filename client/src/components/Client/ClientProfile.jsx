import { useEffect, useState } from "react";
import { useClient } from "../../context/ClientContext";
import { useGlobal } from "../../context/GlobalContext";
import ClientPersonalInformation from "./ClientPersonalInformation";
import ClientProjectsCreated from "./ClientProjectsCreated";
import ClientConsultantsAvailable from "./ClientConsultantsAvailable";
import Loader from "../Loader";
import { handleResponseMessages } from "../../helpers/globalFunctions";

export default function ClientProfile() {
  const [clientInformation, setClientInformation] = useState(false);
  const [infoUpdated, setInfoUpdated] = useState(false);
  const [dataInfo, setDataInfo] = useState("INFO");
  const { getInformationClient } = useClient();

  const { user } = useGlobal();

  useEffect(() => {
    async function getClientInformation() {
      try {
        const res = await getInformationClient();
        console.log(res);
        setClientInformation(res.data);
        setInfoUpdated(true);
      } catch (error) {
        const { status, data } = error.response;
        handleResponseMessages({ status, data });
      }
    }
    getClientInformation();
  }, [infoUpdated]);

  const informationProps = {
    setInfoUpdated,
    clientInformation,
    user,
  };

  const informationSection = {
    INFO: <ClientPersonalInformation {...informationProps} />,
    PROJECTS: <ClientProjectsCreated {...informationProps} />,
    CONSULTANTS: <ClientConsultantsAvailable {...informationProps} />,
  };

  if (clientInformation) {
    return (
      <div
        style={{ textAlign: "center", padding: "20px", position: "relative" }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button onClick={() => setDataInfo("INFO")}>
            INFORMACIÓN PERSONAL
          </button>
          <button onClick={() => setDataInfo("PROJECTS")}>MIS PROYECTOS</button>
          <button onClick={() => setDataInfo("CONSULTANTS")}>
            CONSULTORES DISPONIBLES
          </button>
        </span>
        <br />
        <hr />
        <br />
        {informationSection[dataInfo]}
      </div>
    );
  } else {
    return <Loader />;
  }
}
