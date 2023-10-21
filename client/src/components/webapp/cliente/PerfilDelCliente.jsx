// HOOKS
import useProfileClient from "../../../hooks/cliente/useProfileClient";

// COMPONENTES A USAR
import Loader from "../global/Loader";
import PerfilDelClienteInformacion from "./PerfilDelClienteInformacion";

export default function PerfilDelCliente() {
  const { clientInformation, setCheckClient, checkClient } = useProfileClient();
  if (clientInformation) {
    return (
      <PerfilDelClienteInformacion
        clientInformation={clientInformation}
        setCheckClient={setCheckClient}
        checkClient={checkClient}
      />
    );
  } else {
    return <Loader text="Cargando información..." />;
  }
}
