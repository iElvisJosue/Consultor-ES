/* eslint-disable react/prop-types */

// COMPONENTES A USAR
import ModalEliminar from "../global/ModalEliminar";
import ModalCompletar from "../global/ModalCompletar";
import ModalImagen from "../global/ModalImagen";
import PerfilMenu from "../global/PerfilMenu";
import PerfilDelClienteInformacionPerfil from "./PerfilDelClienteInformacionPerfil";
import PerfilDelClienteInformacionProyectos from "./PerfilDelClienteInformacionProyectos";
import PerfilDelClienteInformacionProyectosLista from "./PerfilDelClienteInformacionProyectosLista";
import PerfilDelClienteInformacionProyectosEditar from "./PerfilDelClienteInformacionProyectosEditar";
import PerfilDelClienteInformacionCrearProyecto from "./PerfilDelClienteInformacionCrearProyecto";
import PerfilDelClienteInformacionConsultores from "./PerfilDelClienteInformacionConsultores";
import PerfilDelClienteInformacionConfiguracion from "./PerfilDelClienteInformacionConfiguracion";

// HOOKS A USAR
import useMenu from "../../../hooks/useMenu";
import useID from "../../../hooks/useID";
import useModalDelete from "../../../hooks/consultor/useModalDelete";
import useModalComplete from "../../../hooks/cliente/useModalComplete";
import useModalImage from "../../../hooks/useModalImage";

// ESTILOS A USAR (SON LOS MISMOS QUE EL DEL CONSULTOR)
import "../../../styles/webapp/PerfilDelConsultorInformacion.css";

export default function PerfilDelClienteInformacion({
  clientInformation,
  setCheckClient,
  checkClient,
}) {
  const { changeMenu, menu } = useMenu();
  const {
    setShowModalDelete,
    classModalDelete,
    typeElementDelete,
    setTypeElementDelete,
  } = useModalDelete();
  const { classModalComplete, setShowModalComplete } = useModalComplete();
  const { classModalImage, setShowModalImage } = useModalImage();
  const { elementID, setElementID } = useID();
  const { picture } = clientInformation.data.dataClient;

  const clientProfileCommonProps = {
    clientInformation,
    setCheckClient,
    checkClient,
    changeMenu,
    menu,
    setElementID,
    elementID,
    setShowModalDelete,
    setShowModalComplete,
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

  const modalCompleteProps = {
    setShowModalComplete,
    classModalComplete,
    setElementID,
    elementID,
    setCheckClient,
    checkClient,
  };

  const modalDeleteProps = {
    setElementID,
    elementID,
    setShowModalDelete,
    classModalDelete,
    typeElementDelete,
    setTypeElementDelete,
    setCheckClient,
    checkClient,
  };

  const profileOptionsToRender = {
    Perfil: PerfilDelClienteInformacionPerfil,
    Proyectos: PerfilDelClienteInformacionProyectos,
    ProyectosEditar: PerfilDelClienteInformacionProyectosEditar,
    ProyectosLista: PerfilDelClienteInformacionProyectosLista,
    CrearProyecto: PerfilDelClienteInformacionCrearProyecto,
    Consultores: PerfilDelClienteInformacionConsultores,
    Configuración: PerfilDelClienteInformacionConfiguracion,
  };

  const ProfileSectionToRender = profileOptionsToRender[menu];

  return (
    <div className="Main__Profile__Information">
      <ModalEliminar {...modalDeleteProps} />
      <ModalCompletar {...modalCompleteProps} />
      <ModalImagen {...modalImageProps} />
      <PerfilMenu {...menuProps} />
      <section className="Main__Profile__Information--Content">
        <ProfileSectionToRender {...clientProfileCommonProps} />
      </section>
    </div>
  );
}
