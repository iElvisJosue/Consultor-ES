/* eslint-disable react/prop-types */
// HOOKS
import useGetUsersAndProjects from "../../../hooks/admin/useGetUsersAndProjects";

// COMPONENTES A USAR
import Loader from "../global/Loader";
import PerfilDelAdminInformacion from "./PerfilDelAdminInformacion";

export default function PerfilDelCliente() {
  const {
    totalUsersProjects,
    colorsGraph,
    setUsersProjects,
    checkUsersProjects,
  } = useGetUsersAndProjects();

  setTimeout(() => {
    setUsersProjects(!checkUsersProjects);
  }, 5000);

  if (totalUsersProjects) {
    return (
      <PerfilDelAdminInformacion
        totalUsersProjects={totalUsersProjects}
        colorsGraph={colorsGraph}
      />
    );
  } else {
    return <Loader text="Cargando información..." />;
  }
}
