/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import ConsultantAddCV from "./Consultant/ConsultantAddCV";
import ConsultantInformationCV from "./Consultant/ConsultantInformationCV";
import Loader from "./Loader";

export default function ConsultantProfile({ user }) {
  const [consultantInformation, setConsultantInformation] = useState(false);
  const [checkCV, setCheckCV] = useState(false);
  const cvIsDone = useRef(null);

  const { email } = user;
  const { getConsultantProfile } = useAuth();

  useEffect(() => {
    async function getConsultantInformation() {
      try {
        const res = await getConsultantProfile();
        cvIsDone.current = res.data.cvIsDone;
        setConsultantInformation(res);
      } catch (error) {
        console.log(error);
      }
    }
    getConsultantInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkCV]);

  if (cvIsDone.current === null) {
    return <Loader />;
  }

  return (
    <section className="Main__Consultant__Profile">
      {cvIsDone.current ? (
        <ConsultantInformationCV
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
}
