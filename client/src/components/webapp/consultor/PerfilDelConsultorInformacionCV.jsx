/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import PerfilDelConsultorInformacionCVResume from "./PerfilDelConsultorInformacionCVResume";
import PerfilDelConsultorInformacionCVExperiencia from "./PerfilDelConsultorInformacionCVExperiencia";
import PerfilDelConsultorInformacionCVEducacion from "./PerfilDelConsultorInformacionCVEducacion";
import PerfilDelConsultorInformacionCVAreas from "./PerfilDelConsultorInformacionCVAreas";
import PerfilDelConsultorInformacionCVHabilidades from "./PerfilDelConsultorInformacionCVHabilidades";
import PerfilDelConsultorInformacionCVIdiomas from "./PerfilDelConsultorInformacionCVIdiomas";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacionCV.css";

export default function PerfilDelConsultorInformacionCV({
  consultantInformation,
  setCheckCV,
  checkCV,
  changeMenu,
  setElementID,
  setShowModalDelete,
  setTypeElementDelete,
}) {
  const {
    consultantResume,
    consultantExperience,
    consultantEducation,
    consultantAreas,
    consultantSkills,
    consultantLanguages,
  } = consultantInformation.data;

  const consultantInformationCVCommonProps = {
    setCheckCV,
    checkCV,
    changeMenu,
    setElementID,
    setShowModalDelete,
    setTypeElementDelete,
  };

  return (
    <>
      <PerfilDelConsultorInformacionCVResume
        {...consultantInformationCVCommonProps}
        consultantResume={consultantResume}
        nameMenu="CVEditarResume"
      />
      <PerfilDelConsultorInformacionCVExperiencia
        {...consultantInformationCVCommonProps}
        consultantExperience={consultantExperience}
        nameMenu="CVAdministrarExperiencia"
      />
      <PerfilDelConsultorInformacionCVEducacion
        {...consultantInformationCVCommonProps}
        consultantEducation={consultantEducation}
        nameMenu="CVAdministrarEducacion"
      />
      <PerfilDelConsultorInformacionCVAreas
        {...consultantInformationCVCommonProps}
        consultantAreas={consultantAreas}
        nameMenu="CVAdministrarArea"
      />
      <PerfilDelConsultorInformacionCVHabilidades
        {...consultantInformationCVCommonProps}
        consultantSkills={consultantSkills}
        nameMenu="CVAdministrarHabilidad"
      />
      <PerfilDelConsultorInformacionCVIdiomas
        {...consultantInformationCVCommonProps}
        consultantLanguages={consultantLanguages}
        nameMenu="CVAdministrarIdioma"
      />
    </>
  );
}
