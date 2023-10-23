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
  const {
    searching,
    consultants,
    checkConsultantsAvailable,
    setCheckConsultantsAvailable,
  } = useGetConsultants({ clientInformation });

  if (searching) {
    return <Loader small={true} text="Buscando consultores..." />;
  }

  setTimeout(() => {
    setCheckConsultantsAvailable(!checkConsultantsAvailable);
  }, 5000);

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
            checkConsultantsAvailable={checkConsultantsAvailable}
            setCheckConsultantsAvailable={setCheckConsultantsAvailable}
          />
        )}
      </>
    );
  } else {
    return (
      <SinInformacion>¡No hay consultores disponibles para ti!</SinInformacion>
    );
  }
}
