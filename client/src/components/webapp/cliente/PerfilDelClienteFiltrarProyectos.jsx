/* eslint-disable react/prop-types */
// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteFiltrarProyectos.css";

export default function PerfilDelClienteFiltrarProyectos({
  setFilter,
  filter,
}) {
  return (
    <span className="Main__Profile__Information--Content--ClientProjects--Filter">
      <button
        className={`Main__Profile__Information--Content--ClientProjects--Filter--Button ${
          filter === "Activos" ? "Active" : ""
        }`}
        onClick={() => setFilter("Activos")}
      >
        Activos
      </button>
      <button
        className={`Main__Profile__Information--Content--ClientProjects--Filter--Button ${
          filter === "Completados" ? "Active" : ""
        }`}
        onClick={() => setFilter("Completados")}
      >
        Completados
      </button>
    </span>
  );
}
