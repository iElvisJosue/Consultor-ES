/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import SubtituloDeLaSeccion from "../global/SubtituloDeLaSeccion";
import TextoDeLaSeccion from "../global/TextoDeLaSeccion";

export default function DetallesDeLaEducacion({
  education,
  numberEducation,
  changeMenu,
  nameMenu,
  setElementID,
  setShowModalDelete,
  setTypeElementDelete,
}) {
  const { _id, institution, area, educationLevel, startDate, endDate } =
    education;
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
        Educación {numberEducation} 👨‍🎓
      </SubtituloDeLaSeccion>
      <TextoDeLaSeccion title="🏫 Institución:" text={institution} />
      <TextoDeLaSeccion title="👨‍💻 Área:" text={area} />
      <TextoDeLaSeccion title="↗️ Nivel de educación:" text={educationLevel} />
      <TextoDeLaSeccion title="📅 Fecha:" text={`${startDate} - ${endDate}`} />
    </>
  );
}
