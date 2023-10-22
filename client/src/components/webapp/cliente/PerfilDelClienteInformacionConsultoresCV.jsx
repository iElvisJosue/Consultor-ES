/* eslint-disable react/prop-types */
// COMPONENTE A USAR
import Divisor from "../global/Divisor";
import SinInformacion from "../global/SinInformacion";
import PerfilDelClienteInformacionConsultoresCVResume from "../cliente/PerfilDelClienteInformacionConsultoresCVResume";
import PerfilDelClienteInformacionConsultoresCVExperiencia from "../cliente/PerfilDelClienteInformacionConsultoresCVExperiencia";
import PerfilDelClienteInformacionConsultoresCVEducacion from "../cliente/PerfilDelClienteInformacionConsultoresCVEducacion";
import PerfilDelClienteInformacionConsultoresCVHabilidades from "../cliente/PerfilDelClienteInformacionConsultoresCVHabilidades";
import PerfilDelClienteInformacionConsultoresCVIdiomas from "../cliente/PerfilDelClienteInformacionConsultoresCVIdiomas";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelClienteInformacionConsultoresCV.css";

export default function PerfilDelClienteInformacionConsultoresCV({
  consultants,
  setElementID,
  elementID,
}) {
  const profileConsultant = consultants
    .flat(Infinity)
    .find(({ consultantInformation }) => {
      return consultantInformation.ownerID === elementID;
    });

  const {
    ownerID,
    emailConsultant,
    experienceConsultant,
    educationConsultant,
    skillsConsultant,
    languagesConsultant,
  } = profileConsultant.consultantInformation;

  const checkConsultant = () => {
    console.log("El ID del consultor es: ", ownerID);
    console.log("El correo del consultor es: ", emailConsultant);
  };

  return (
    <div className="Main__Profile__Information--Content--ConsultantCV">
      <PerfilDelClienteInformacionConsultoresCVResume
        profileConsultant={profileConsultant}
        setElementID={setElementID}
      />
      <Divisor />
      {experienceConsultant.length > 0 ? (
        experienceConsultant.map((consultantExperience, index) => (
          <PerfilDelClienteInformacionConsultoresCVExperiencia
            consultantExperience={consultantExperience}
            key={index}
            index={index}
          />
        ))
      ) : (
        <SinInformacion>
          ¡Vaya, esté consultor no cuenta con experiencia!
        </SinInformacion>
      )}
      <Divisor />
      {educationConsultant.length > 0 ? (
        educationConsultant.map((consultantEducation, index) => (
          <PerfilDelClienteInformacionConsultoresCVEducacion
            consultantEducation={consultantEducation}
            key={index}
            index={index}
          />
        ))
      ) : (
        <SinInformacion>
          ¡Vaya, esté consultor no cuenta con educación!
        </SinInformacion>
      )}
      <Divisor />
      {skillsConsultant.length > 0 ? (
        skillsConsultant.map((consultantSkills, index) => (
          <PerfilDelClienteInformacionConsultoresCVHabilidades
            consultantSkills={consultantSkills}
            key={index}
            index={index}
          />
        ))
      ) : (
        <SinInformacion>
          {" "}
          ¡Vaya, esté consultor no cuenta con habilidades!
        </SinInformacion>
      )}
      <Divisor />
      {languagesConsultant.length > 0 ? (
        languagesConsultant.map((consultantLanguages, index) => (
          <PerfilDelClienteInformacionConsultoresCVIdiomas
            consultantLanguages={consultantLanguages}
            key={index}
            index={index}
          />
        ))
      ) : (
        <SinInformacion>
          {" "}
          ¡Vaya, esté consultor no cuenta con idiomas!
        </SinInformacion>
      )}
      <button
        className="Main__Profile__Information--Content--ConsultantCV--Button"
        onClick={checkConsultant}
      >
        Contratar Consultor
      </button>
    </div>
  );
}
