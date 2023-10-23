/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import PerfilDelConsultorAgregarCV from "./PerfilDelConsultorAgregarCV";
import PerfilDelConsultorInformacion from "./PerfilDelConsultorInformacion";
import Loader from "../global/Loader";

// HOOKS A USAR
import useProfileConsultant from "../../../hooks/consultor/useProfileConsultant";

export default function PerfilDelConsultor({ user }) {
  const { consultantInformation, cvIsDone, setCheckCV, checkCV } =
    useProfileConsultant();

  if (cvIsDone.current !== null) {
    return (
      <>
        {cvIsDone.current ? (
          <PerfilDelConsultorInformacion
            consultantInformation={consultantInformation}
            setCheckCV={setCheckCV}
            checkCV={checkCV}
            user={user}
          />
        ) : (
          <PerfilDelConsultorAgregarCV
            setCheckCV={setCheckCV}
            checkCV={checkCV}
          />
        )}
      </>
    );
  } else {
    return <Loader text="Cargando información..." />;
  }
}
