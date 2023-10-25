/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";
import Divisor from "../global/Divisor";
import PerfilAdminInformacionEstadisticasUsuarios from "./PerfilAdminInformacionEstadisticasUsuarios";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilAdminInformacionEstadisticas.css";

export default function PerfilAdminInformacionEstadisticas({
  totalUsersProjects,
  colorsGraph,
}) {
  const { totalUsers, totalProjects } = totalUsersProjects;
  const { usersColors, projectsColors } = colorsGraph;
  return (
    <div className="Main__Profile__Information--Content--Statistics">
      <TituloDeLaSeccion editable={false}>
        📊 Estadísticas Generales De Los Usuarios 👥
      </TituloDeLaSeccion>
      <PerfilAdminInformacionEstadisticasUsuarios
        totalUsers={totalUsers}
        usersColors={usersColors}
      />
      <Divisor />
      <TituloDeLaSeccion editable={false}>
        📊 Estadísticas Generales De Los Proyectos 🗃️
      </TituloDeLaSeccion>
      <PerfilAdminInformacionEstadisticasUsuarios
        totalProjects={totalProjects}
        projectsColors={projectsColors}
      />
    </div>
  );
}
