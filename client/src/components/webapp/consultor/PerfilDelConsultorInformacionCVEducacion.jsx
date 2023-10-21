/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import TituloDeLaSeccion from "../global/TituloDeLaSeccion";
import DetallesDeLaEducacion from "../global/DetallesDeLaEducacion";
import ButtonSubmit from "../global/ButtonSubmit";
import SinInformacion from "../global/SinInformacion";

export default function PerfilDelConsultorInformacionCVEducacion({
  consultantEducation,
  changeMenu,
  nameMenu,
  setElementID,
  setShowModalDelete,
  setTypeElementDelete,
}) {
  return (
    <div className="Main__Profile__Information--Content--CVEducation">
      <TituloDeLaSeccion editable={false}>
        Educación Profesional 📚
      </TituloDeLaSeccion>
      {consultantEducation.length > 0 ? (
        consultantEducation.map((education, index) => (
          <DetallesDeLaEducacion
            key={index}
            education={education}
            numberEducation={index + 1}
            changeMenu={changeMenu}
            nameMenu={nameMenu}
            setElementID={setElementID}
            setShowModalDelete={setShowModalDelete}
            setTypeElementDelete={setTypeElementDelete}
          />
        ))
      ) : (
        <SinInformacion>¡No cuentas con educación profesional!</SinInformacion>
      )}
      <ButtonSubmit
        changeMenu={changeMenu}
        nameMenu={nameMenu}
        addElement={true}
        text="Agregar Nueva Educación"
      />
    </div>
  );
}
