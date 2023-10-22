/* eslint-disable react/prop-types */
// HOOKS A USAR
import useGetConsultants from "../../../hooks/cliente/useGetConsultants";

// COMPONENTES A USAR
import Loader from "../global/Loader";
import SinInformacion from "../global/SinInformacion";
import PerfilDelClienteInformacionConsultoresDisponibles from "../cliente/PerfilDelClienteInformacionConsultoresDisponibles";
import PerfilDelClienteInformacionConsultoresCV from "../cliente/PerfilDelClienteInformacionConsultoresCV";

export default function PerfilDelClienteInformacionConsultores({
  clientInformation,
  setElementID,
  elementID,
}) {
  const { searching, consultants } = useGetConsultants({ clientInformation });

  if (searching) {
    return <Loader small={true} text="Buscando consultores..." />;
  }
  if (consultants) {
    return (
      <>
        {elementID ? (
          <PerfilDelClienteInformacionConsultoresCV
            consultants={consultants}
            setElementID={setElementID}
            elementID={elementID}
          />
        ) : (
          <PerfilDelClienteInformacionConsultoresDisponibles
            consultants={consultants}
            setElementID={setElementID}
          />
        )}
      </>
    );
  } else {
    return (
      <SinInformacion>
        ¡Sin proyectos no podemos asignar consultores!
      </SinInformacion>
    );
  }
}
