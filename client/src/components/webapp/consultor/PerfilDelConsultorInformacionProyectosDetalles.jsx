/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import BackSection from "../global/BackSection";

// AYUDAS A USAR
import { formatPayment } from "../../../helpers/FormatoDePago";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionProyectosDetalles.css";

export default function PerfilDelConsultorInformacionProyectosDetalles({
  projectsAvailable,
  changeMenu,
  setElementID,
  elementID,
}) {
  const projectDetails = projectsAvailable.find(
    ({ idProject }) => idProject === elementID
  );
  const backSectionHeaderProps = {
    imgUrl: "./ProyectoDetalles.png",
    imgAlt: "Detalles Del Proyecto",
    title: "Detalles Del Proyecto 🗃️",
    changeMenu,
  };

  const checkEmail = (email) => {
    console.log(email);
  };

  return (
    <div className="Main__Profile__Information--Content--ProjectsDetails">
      <BackSection
        {...backSectionHeaderProps}
        nameMenu="Proyectos"
        setElementID={setElementID}
      >
        Regresar
      </BackSection>
      <div className="Main__Profile__Information--Content--ProjectsDetails--Content">
        <header className="Main__Profile__Information--Content--ProjectsDetails--Content--Header">
          ¡Hola consultor 👋! Si estás aquí es porque eres el ingrediente
          secreto para hacer realidad este proyecto. Tu experiencia y
          habilidades son la chispa que lo encenderá. Aprovecha esta oportunidad
          para brillar y llevar este proyecto hacia el éxito. ¡Juntos, podemos
          lograr grandes cosas! 🤝
          <br />
          <br />
          Mi nombre es
          <strong>
            {` ${projectDetails.nameClient} ${projectDetails.lastNameClient} ${projectDetails.motherLastNameClient}`}{" "}
          </strong>
          y te voy a contar un poco más de mi proyecto. 🗣️
        </header>
        <p className="Main__Profile__Information--Content--ProjectsDetails--Content--Text">
          <strong>💼 Nombre: </strong>
          {projectDetails.nameProject.toUpperCase()}
        </p>
        <p className="Main__Profile__Information--Content--ProjectsDetails--Content--Text">
          <strong>📝 Detalles: </strong>
          {projectDetails.detailsProject}
        </p>
        <p className="Main__Profile__Information--Content--ProjectsDetails--Content--Text">
          <strong>💰 Pago: </strong>
          {formatPayment(projectDetails.paymentProject)}
          <strong
            style={{
              marginLeft: 20,
            }}
          >
            🕰️ Tiempo:{" "}
          </strong>
          {projectDetails.timeProject}
          <strong
            style={{
              marginLeft: 20,
            }}
          >
            🛠️ Área:{" "}
          </strong>
          {projectDetails.areaProject}
        </p>
      </div>
      <button
        className="Main__Profile__Information--Content--ProjectsDetails--Content--Button"
        onClick={() => checkEmail(projectDetails.emailClient)}
      >
        Estoy Interesado
      </button>
    </div>
  );
}
