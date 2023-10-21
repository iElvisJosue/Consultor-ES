/* eslint-disable react/prop-types */

// COMPONENTES A USAR
import PerfilInformacionPerfilUsuario from "../global/PerfilInformacionPerfilUsuario";
import PerfilDelClienteInformacionPerfilPersonal from "../../../components/webapp/cliente/PerfilDelClienteInformacionPerfilPersonal";
import PerfilDelClienteInformacionPerfilNegocio from "../../../components/webapp/cliente/PerfilDelClienteInformacionPerfilNegocio";

export default function PerfilDelClienteInformacionPerfil({
  clientInformation,
  setCheckClient,
  checkClient,
}) {
  const { dataClient } = clientInformation.data;

  const clientCommonProps = {
    dataClient,
    setCheckClient,
    checkClient,
  };

  return (
    <>
      <PerfilInformacionPerfilUsuario />
      <PerfilDelClienteInformacionPerfilPersonal {...clientCommonProps} />
      <PerfilDelClienteInformacionPerfilNegocio {...clientCommonProps} />
    </>
  );
}
