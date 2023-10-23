/* eslint-disable react/prop-types */

// COMPONENTES A USAR
import Loader from "../global/Loader";
import SinInformacion from "../global/SinInformacion";
import PerfilDelConsultorInformacionProyectosDisponibles from "../consultor/PerfilDelConsultorInformacionProyectosDisponibles";
import PerfilDelConsultorInformacionProyectosDetalles from "../consultor/PerfilDelConsultorInformacionProyectosDetalles";

// HOOKS A USAR
import useGetProjects from "../../../hooks/consultor/useGetProjects";

export default function PerfilDelConsultorInformacionProyectos({
  consultantInformation,
  setElementID,
  elementID,
  changeMenu,
}) {
  const consultantAreas = consultantInformation.data.consultantAreas;
  const {
    projectsAvailable,
    searching,
    setCheckProjectsAvailable,
    checkProjectsAvailable,
  } = useGetProjects({ consultantAreas });

  setTimeout(() => {
    setCheckProjectsAvailable(!checkProjectsAvailable);
  }, 5000);

  if (searching) return <Loader small={true} text="Buscando Proyectos..." />;
  if (projectsAvailable) {
    const amountProjects = projectsAvailable.length;
    return (
      <>
        {elementID ? (
          <PerfilDelConsultorInformacionProyectosDetalles
            setElementID={setElementID}
            elementID={elementID}
            projectsAvailable={projectsAvailable}
            changeMenu={changeMenu}
          />
        ) : (
          <PerfilDelConsultorInformacionProyectosDisponibles
            projectsAvailable={projectsAvailable}
            amountProjects={amountProjects}
            setElementID={setElementID}
            setCheckProjectsAvailable={setCheckProjectsAvailable}
            checkProjectsAvailable={checkProjectsAvailable}
          />
        )}
      </>
    );
  } else {
    return (
      <SinInformacion>¡No hay proyectos disponibles para ti!</SinInformacion>
    );
  }
}
