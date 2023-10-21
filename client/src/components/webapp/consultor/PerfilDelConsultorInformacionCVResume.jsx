/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";
import TextoDeLaSeccion from "../global/TextoDeLaSeccion";

// AYUDAS A USAR
import { cvInformationResume } from "../../../helpers/PerfilDelConsultorInformacionCVResume";

export default function PerfilDelConsultorInformacionCVResume({
  consultantResume,
  changeMenu,
  nameMenu,
  setElementID,
}) {
  const informationResume = cvInformationResume(consultantResume);
  const textInformationResume = informationResume.map(
    ({ title, text }, index) => (
      <TextoDeLaSeccion key={index} title={title} text={text} />
    )
  );
  return (
    <div className="Main__Profile__Information--Content--CVResume">
      <TituloDeLaSeccion
        changeMenu={changeMenu}
        nameMenu={nameMenu}
        setElementID={setElementID}
        editable={true}
        id={consultantResume._id}
      >
        Resumen Profesional 📑
      </TituloDeLaSeccion>
      {textInformationResume}
    </div>
  );
}
