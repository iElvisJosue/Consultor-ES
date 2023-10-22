/* eslint-disable react/prop-types */
// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionConsultoresCVHabilidades.css";

export default function PerfilDelClienteInformacionConsultoresCVHabilidades({
  consultantSkills,
  index,
}) {
  const { nameSkill } = consultantSkills;

  return (
    <section className="Main__Profile__Information--Content--ConsultantCV--Skills">
      {index === 0 && (
        <h1 className="Main__Profile__Information--Content--ConsultantCV--Skills--Title">
          Habilidades 🎲
        </h1>
      )}
      <p className="Main__Profile__Information--Content--ConsultantCV--Skills--Area">
        🛠️ {nameSkill}
      </p>
    </section>
  );
}
