/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import SubtituloDeLaSeccion from "../global/SubtituloDeLaSeccion";
import TextoDeLaSeccion from "../global/TextoDeLaSeccion";

export default function DetallesDeLaExperiencia({
  experience,
  numberExperience,
  changeMenu,
  nameMenu,
  setElementID,
  setShowModalDelete,
  setTypeElementDelete,
}) {
  const { _id, position, company, resume, startDate, endDate } = experience;
  return (
    <>
      <SubtituloDeLaSeccion
        changeMenu={changeMenu}
        nameMenu={nameMenu}
        setElementID={setElementID}
        setShowModalDelete={setShowModalDelete}
        setTypeElementDelete={setTypeElementDelete}
        id={_id}
        completed={false}
      >
        Experiencia {numberExperience} 👨‍⚖️
      </SubtituloDeLaSeccion>
      <TextoDeLaSeccion title="👨‍🏫 Cargo:" text={position} />
      <TextoDeLaSeccion title="🏢 Empresa:" text={company} />
      <TextoDeLaSeccion title="📝 Resumen del cargo:" text={resume} />
      <TextoDeLaSeccion title="📅 Fecha:" text={`${startDate} - ${endDate}`} />
    </>
  );
}
