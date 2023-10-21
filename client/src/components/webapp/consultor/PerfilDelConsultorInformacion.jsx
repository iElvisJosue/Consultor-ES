/* eslint-disable react/prop-types */

// COMPONENTES A USAR
import ModalEliminar from "../global/ModalEliminar";
import PerfilMenu from "../global/PerfilMenu";
import PerfilDelConsultorInformacionCV from "./PerfilDelConsultorInformacionCV";
import PerfilDelConsultorInformacionPerfil from "./PerfilDelConsultorInformacionPerfil";
import PerfilDelConsultorInformacionBanco from "./PerfilDelConsultorInformacionBanco";
import PerfilDelConsultorInformacionProyectos from "./PerfilDelConsultorInformacionProyectos";
import PerfilDelConsultorInformacionConfiguracion from "./PerfilDelConsultorInformacionConfiguracion";
import PerfilDelConsultorInformacionCVEditarResume from "./PerfilDelConsultorInformacionCVEditarResume";
import PerfilDelConsultorInformacionCVAdministrarExperiencia from "./PerfilDelConsultorInformacionCVAdministrarExperiencia";
import PerfilDelConsultorInformacionCVAdministrarEducacion from "./PerfilDelConsultorInformacionCVAdministrarEducacion";
import PerfilDelConsultorInformacionCVAdministrarArea from "./PerfilDelConsultorInformacionCVAdministrarArea";
import PerfilDelConsultorInformacionCVAdministrarHabilidad from "./PerfilDelConsultorInformacionCVAdministrarHabilidad";
import PerfilDelConsultorInformacionCVAdministrarIdioma from "./PerfilDelConsultorInformacionCVAdministrarIdioma";

// HOOKS A USAR
import useMenu from "../../../hooks/useMenu";
import useID from "../../../hooks/useID";
("../../../hooks/useID");
import useModalDelete from "../../../hooks/consultor/useModalDelete";

// ESTILOS A USAR
import "../../../styles/webapp/PerfilDelConsultorInformacion.css";

export default function PerfilDelConsultorInformacion({
  consultantInformation,
  setCheckCV,
  checkCV,
}) {
  const { changeMenu, menu } = useMenu();
  const {
    setShowModalDelete,
    classModalDelete,
    typeElementDelete,
    setTypeElementDelete,
  } = useModalDelete();
  const { elementID, setElementID } = useID();

  const consultantProfileCommonProps = {
    consultantInformation,
    setCheckCV,
    checkCV,
    changeMenu,
    menu,
    setElementID,
    elementID,
    setShowModalDelete,
    typeElementDelete,
    setTypeElementDelete,
  };

  const modalDeleteProps = {
    setElementID,
    elementID,
    setShowModalDelete,
    classModalDelete,
    typeElementDelete,
    setTypeElementDelete,
    setCheckCV,
    checkCV,
  };

  const profileOptionsToRender = {
    Perfil: PerfilDelConsultorInformacionPerfil,
    CV: PerfilDelConsultorInformacionCV,
    CVEditarResume: PerfilDelConsultorInformacionCVEditarResume,
    CVAdministrarExperiencia:
      PerfilDelConsultorInformacionCVAdministrarExperiencia,
    CVAdministrarEducacion: PerfilDelConsultorInformacionCVAdministrarEducacion,
    CVAdministrarArea: PerfilDelConsultorInformacionCVAdministrarArea,
    CVAdministrarHabilidad: PerfilDelConsultorInformacionCVAdministrarHabilidad,
    CVAdministrarIdioma: PerfilDelConsultorInformacionCVAdministrarIdioma,
    Banco: PerfilDelConsultorInformacionBanco,
    Proyectos: PerfilDelConsultorInformacionProyectos,
    Configuración: PerfilDelConsultorInformacionConfiguracion,
  };

  const ProfileSectionToRender = profileOptionsToRender[menu];

  return (
    <div className="Main__Profile__Information">
      <ModalEliminar {...modalDeleteProps} />
      <PerfilMenu
        setElementID={setElementID}
        changeMenu={changeMenu}
        menu={menu}
      />
      <section className="Main__Profile__Information--Content">
        <ProfileSectionToRender {...consultantProfileCommonProps} />
      </section>
    </div>
  );
}
