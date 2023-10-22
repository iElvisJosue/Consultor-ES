/* eslint-disable react/prop-types */

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionConsultoresCVResume.css";

export default function PerfilDelClienteInformacionConsultoresCVResume({
  profileConsultant,
  setElementID,
}) {
  const {
    nameConsultant,
    pictureConsultant,
    lastNameConsultant,
    motherLastNameConsultant,
    professionConsultant,
    descriptionConsultant,
    emailConsultant,
    numberConsultant,
    LinkedInConsultant,
  } = profileConsultant.consultantInformation;

  return (
    <header className="Main__Profile__Information--Content--ConsultantCV--Resume">
      <button
        className="Main__Profile__Information--Content--ConsultantCV--Resume--Button"
        onClick={() => setElementID(null)}
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
        Regresar
      </button>
      <img
        src={pictureConsultant || "/CEO.png"}
        alt={`${nameConsultant} ${lastNameConsultant} ${motherLastNameConsultant} Foto de perfil`}
        className="Main__Profile__Information--Content--ConsultantCV--Resume--Img"
      />
      <h1 className="Main__Profile__Information--Content--ConsultantCV--Resume--Title">{`${nameConsultant} ${lastNameConsultant} ${motherLastNameConsultant}`}</h1>
      <h2 className="Main__Profile__Information--Content--ConsultantCV--Resume--SubTitle">
        {professionConsultant}
      </h2>
      <span className="Main__Profile__Information--Content--ConsultantCV--Resume--Contact">
        <a href={`mailto:${emailConsultant}`}>
          <ion-icon name="mail-outline"></ion-icon>Mi Correo
        </a>
        <a
          href={`https://wa.me/${numberConsultant}`}
          target="_blank"
          rel="noreferrer"
        >
          <ion-icon name="logo-whatsapp"></ion-icon>
          {numberConsultant}
        </a>
        {LinkedInConsultant && (
          <a href={LinkedInConsultant} target="_blank" rel="noreferrer">
            <ion-icon name="logo-linkedin"></ion-icon>Mi LinkedIn
          </a>
        )}
      </span>
      <h3 className="Main__Profile__Information--Content--ConsultantCV--Resume--Details">
        {descriptionConsultant}
      </h3>
    </header>
  );
}
