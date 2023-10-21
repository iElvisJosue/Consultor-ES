/* eslint-disable react/prop-types */

// COMPONENTES A USAR
import PerfilInformacionPerfilUsuario from "../global/PerfilInformacionPerfilUsuario";
import PerfilDelConsultorInformacionPerfilPersonal from "../../../components/webapp/consultor/PerfilDelConsultorInformacionPerfilPersonal";

export default function PerfilDelConsultorInformacionPerfil({
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const { consultantInformation: consultantPersonalData } =
    consultantInformation.data;

  return (
    <>
      <PerfilInformacionPerfilUsuario />
      <PerfilDelConsultorInformacionPerfilPersonal
        consultantPersonalData={consultantPersonalData}
        setCheckCV={setCheckCV}
        checkCV={checkCV}
      />
    </>
  );
}
