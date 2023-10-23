/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";

// AYUDAS A USAR
import { formatPayment } from "../../../helpers/FormatoDePago";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionProyectosDisponibles.css";

export default function PerfilDelConsultorInformacionProyectosDisponibles({
  projectsAvailable,
  amountProjects,
  setElementID,
}) {
  return (
    <div className="Main__Profile__Information--Content--ProjectsAvailable">
      <TituloDeLaSeccion editable={false}>
        Proyectos Disponibles: {amountProjects} ✨
      </TituloDeLaSeccion>
      {projectsAvailable.map(
        (
          {
            idProject,
            pictureClient,
            nameProject,
            detailsProject,
            areaProject,
            timeProject,
            paymentProject,
          },
          index
        ) => (
          <div
            className="Main__Profile__Information--Content--ProjectsAvailable--Container"
            key={index}
          >
            <span className="Main__Profile__Information--Content--ProjectsAvailable--Container--Project">
              <p className="Main__Profile__Information--Content--ProjectsAvailable--Container--Project--Name">
                ¡Buenas noticias! 🎉 Tenemos este proyecto disponible en tu área
                <i> ¡{areaProject}!</i>
              </p>
            </span>
            <div className="Main__Profile__Information--Content--ProjectsAvailable--Container--Details">
              <figure className="Main__Profile__Information--Content--ProjectsAvailable--Container--Details--Picture">
                <img
                  // src={
                  //   pictureClient
                  //     ? `http://localhost:4000/usersPictures/${pictureClient}`
                  //     : "./CEO.png"
                  // }
                  src={
                    pictureClient
                      ? `https://consultor-es.onrender.com/usersPictures/${pictureClient}`
                      : "./CEO.png"
                  }
                  alt="Foto Del Cliente"
                />
              </figure>
              <div className="Main__Profile__Information--Content--ProjectsAvailable--Container--Details--Info">
                <p className="Main__Profile__Information--Content--ProjectsAvailable--Container--Details--Name">
                  {nameProject}
                </p>
                <p className="Main__Profile__Information--Content--ProjectsAvailable--Container--Details--Area">
                  <strong>📃 Detalles:</strong> {detailsProject}
                </p>
                <p className="Main__Profile__Information--Content--ProjectsAvailable--Container--Details--Time">
                  <strong>🕰️ Tiempo:</strong> {timeProject}
                </p>
                <p className="Main__Profile__Information--Content--ProjectsAvailable--Container--Details--Payment">
                  <strong>💰 Pago:</strong> {formatPayment(paymentProject)}
                </p>
              </div>
            </div>
            <span className="Main__Profile__Information--Content--ProjectsAvailable--Container--Button">
              <button onClick={() => setElementID(idProject)}>
                Más Detalles
              </button>
            </span>
          </div>
        )
      )}
    </div>
  );
}
