/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";
import SinInformacion from "../global/SinInformacion";
import PerfilDelClienteInformacionProyectosLista from "./PerfilDelClienteInformacionProyectosLista";
import PerfilDelClienteFiltrarProyectos from "./PerfilDelClienteFiltrarProyectos";

// HOOKS
import useFilter from "../../../hooks/cliente/useFilter";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionProyectos.css";

export default function PerfilDelClienteInformacionProyectos({
  clientInformation,
  changeMenu,
  setElementID,
  setShowModalDelete,
  setShowModalComplete,
  setTypeElementDelete,
}) {
  const { projectsClient } = clientInformation.data;
  const { filter, setFilter, projectsFiltered } = useFilter({ projectsClient });

  return (
    <div className="Main__Profile__Information--Content--ClientProjects">
      <TituloDeLaSeccion editable={false}>Mis Proyectos 👨‍💻</TituloDeLaSeccion>
      <PerfilDelClienteFiltrarProyectos setFilter={setFilter} filter={filter} />
      {projectsFiltered.length > 0 ? (
        projectsFiltered.map((project, index) => (
          <PerfilDelClienteInformacionProyectosLista
            key={index}
            index={index + 1}
            project={project}
            changeMenu={changeMenu}
            setElementID={setElementID}
            setShowModalDelete={setShowModalDelete}
            setShowModalComplete={setShowModalComplete}
            setTypeElementDelete={setTypeElementDelete}
            filter={filter}
          />
        ))
      ) : (
        <SinInformacion>{`¡No tienes proyectos ${filter.toLowerCase()}! `}</SinInformacion>
      )}
    </div>
  );
}
