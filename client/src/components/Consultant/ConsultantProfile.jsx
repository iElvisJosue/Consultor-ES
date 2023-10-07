/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useConsultant } from "../../context/ConsultantContext";
import ConsultantAddCV from "./ConsultantAddCV";
import ConsultantInformation from "./ConsultantInformation.jsx";
import Loader from "../Loader";
import "../../styles/ProfileConsultant.css";

export default function ConsultantProfile({ user }) {
  const [consultantInformation, setConsultantInformation] = useState(false);
  const [checkCV, setCheckCV] = useState(false);
  const cvIsDone = useRef(null);

  const { email } = user;
  const { getConsultantProfile } = useConsultant();

  useEffect(() => {
    async function getConsultantInformation() {
      try {
        const res = await getConsultantProfile();
        cvIsDone.current = res.data.consultantInformation.cvIsDone;
        setConsultantInformation(res);
      } catch (error) {
        console.log(error);
      }
    }
    getConsultantInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkCV]);

  if (cvIsDone.current !== null) {
    return (
      <section className="Main__Profile Consultant">
        {cvIsDone.current ? (
          <ConsultantInformation
            email={email}
            consultantInformation={consultantInformation}
            setCheckCV={setCheckCV}
            checkCV={checkCV}
          />
        ) : (
          <ConsultantAddCV setCheckCV={setCheckCV} checkCV={checkCV} />
        )}
      </section>
    );
  } else {
    return <Loader text="Cargando información..." />;
  }
}
