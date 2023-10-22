/* eslint-disable react/prop-types */
// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionConsultoresCVEducacion.css";

export default function PerfilDelClienteInformacionConsultoresCVEducacion({
  consultantEducation,
  index,
}) {
  const { institution, area, educationLevel, startDate, endDate } =
    consultantEducation;

  return (
    <section className="Main__Profile__Information--Content--ConsultantCV--Education">
      {index === 0 && (
        <h1 className="Main__Profile__Information--Content--ConsultantCV--Education--Title">
          Educación 📚
        </h1>
      )}
      <p className="Main__Profile__Information--Content--ConsultantCV--Education--Area">
        👨‍💻 {area}
      </p>
      <p className="Main__Profile__Information--Content--ConsultantCV--Education--Institution">
        🏫 {institution}
      </p>
      <p className="Main__Profile__Information--Content--ConsultantCV--Education--EducationLevel">
        ↗️ {educationLevel}
      </p>
      <p className="Main__Profile__Information--Content--ConsultantCV--Education--Date">
        📅 {startDate} - {endDate}
      </p>
    </section>
  );
}
