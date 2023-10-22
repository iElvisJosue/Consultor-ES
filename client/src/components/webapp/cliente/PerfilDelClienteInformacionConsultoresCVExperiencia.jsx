/* eslint-disable react/prop-types */
// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionConsultoresCVExperiencia.css";
export default function PerfilDelClienteInformacionConsultoresCVExperiencia({
  consultantExperience,
  index,
}) {
  const { company, position, resume, startDate, endDate } =
    consultantExperience;

  return (
    <section className="Main__Profile__Information--Content--ConsultantCV--Experience">
      {index === 0 && (
        <h1 className="Main__Profile__Information--Content--ConsultantCV--Experience--Title">
          Experiencia 💼
        </h1>
      )}
      <p className="Main__Profile__Information--Content--ConsultantCV--Experience--PositionCompany">
        👨‍🔧 {position} - {company} 🏢
      </p>
      <p className="Main__Profile__Information--Content--ConsultantCV--Experience--Resume">
        📃 {resume}
      </p>
      <p className="Main__Profile__Information--Content--ConsultantCV--Experience--Date">
        📅 {startDate} - {endDate}
      </p>
    </section>
  );
}
