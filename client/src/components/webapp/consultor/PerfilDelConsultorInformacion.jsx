/* eslint-disable react/prop-types */

// COMPONENTES A USAR
import ModalEliminar from "../global/ModalEliminar";
import PerfilMenu from "../global/PerfilMenu";
import ModalImagen from "../global/ModalImagen";
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
import useModalDelete from "../../../hooks/consultor/useModalDelete";
import useModalImage from "../../../hooks/useModalImage";

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
  const { classModalImage, setShowModalImage } = useModalImage();
  const { picture } = consultantInformation.data.consultantInformation;

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

  const menuProps = {
    setShowModalImage,
    setElementID,
    changeMenu,
    menu,
    picture,
  };

  const modalImageProps = {
    setShowModalImage,
    classModalImage,
    setElementID,
    elementID,
    picture,
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
      <ModalImagen {...modalImageProps} />
      <PerfilMenu {...menuProps} />
      <section className="Main__Profile__Information--Content">
        <ProfileSectionToRender {...consultantProfileCommonProps} />
      </section>
    </div>
  );
}
