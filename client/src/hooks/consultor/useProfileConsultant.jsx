/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// LIBRERÍAS A USAR
import { useState, useEffect, useRef } from "react";
// CONTEXTOS A USAR
import { useConsultant } from "../../context/ConsultantContext";

export default function useProfileConsultant() {
  const [consultantInformation, setConsultantInformation] = useState(false);
  const [checkCV, setCheckCV] = useState(false);
  const cvIsDone = useRef(null);

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
  }, [checkCV]);

  return {
    consultantInformation,
    cvIsDone,
    setCheckCV,
    checkCV,
  };
}
