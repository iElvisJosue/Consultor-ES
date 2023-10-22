/* eslint-disable react/prop-types */
// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionConsultoresCVIdiomas.css";

export default function PerfilDelClienteInformacionConsultoresCVIdiomas({
  consultantLanguages,
  index,
}) {
  const { nameLanguage, levelLanguage } = consultantLanguages;

  return (
    <section className="Main__Profile__Information--Content--ConsultantCV--Languages">
      {index === 0 && (
        <h1 className="Main__Profile__Information--Content--ConsultantCV--Languages--Title">
          Idiomas 🌍
        </h1>
      )}
      <p className="Main__Profile__Information--Content--ConsultantCV--Languages--NameLevel">
        🗣️ {nameLanguage} - {levelLanguage}
      </p>
    </section>
  );
}
