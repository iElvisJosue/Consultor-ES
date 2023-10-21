/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import PerfilDelConsultorInformacionBancoAgregar from "./PerfilDelConsultorInformacionBancoAgregar";
export default function PerfilDelConsultorInformacionBanco({
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const { consultantBank } = consultantInformation.data;

  return (
    <PerfilDelConsultorInformacionBancoAgregar
      consultantBank={consultantBank}
      setCheckCV={setCheckCV}
      checkCV={checkCV}
    />
  );
}
