/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
// CONTEXTOS A USAR
import { useClient } from "../../context/ClientContext";

export default function useProfileClient() {
  const [clientInformation, setClientInformation] = useState(false);
  const [checkClient, setCheckClient] = useState(false);

  const { getInformationClient } = useClient();

  useEffect(() => {
    async function getClientInformation() {
      try {
        const res = await getInformationClient();
        setClientInformation(res);
      } catch (error) {
        console.log(error);
      }
    }
    getClientInformation();
  }, [checkClient]);

  return {
    clientInformation,
    setCheckClient,
    checkClient,
  };
}
