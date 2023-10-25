/* eslint-disable react/prop-types */

// COMPONENTES A USAR
// import ModalEliminar from "../global/ModalEliminar";
// import ModalCompletar from "../global/ModalCompletar";
// import ModalImagen from "../global/ModalImagen";
import PerfilMenu from "../global/PerfilMenu";
import PerfilAdminInformacionEstadisticas from "./PerfilAdminInformacionEstadisticas";

// HOOKS A USAR
import useMenu from "../../../hooks/useMenu";
import useID from "../../../hooks/useID";

// ESTILOS A USAR
// import "../../../styles/webapp/PerfilDelAdminInformacion.css";

export default function PerfilDelAdminInformacion({
  totalUsersProjects,
  colorsGraph,
}) {
  const { changeMenu, menu } = useMenu();
  const {
    // elementID,
    setElementID,
  } = useID();
  const menuProps = {
    setElementID,
    changeMenu,
    menu,
    btnUpdateImg: false,
  };
  const adminProfileCommonProps = {
    totalUsersProjects,
    colorsGraph,
  };

  const profileOptionsToRender = {
    Perfil: PerfilAdminInformacionEstadisticas,
  };

  const ProfileSectionToRender = profileOptionsToRender[menu];

  return (
    <div className="Main__Profile__Information">
      {/* <ModalEliminar {...modalDeleteProps} />
      <ModalCompletar {...modalCompleteProps} />
      <ModalImagen {...modalImageProps} /> */}
      <PerfilMenu {...menuProps} />
      <section className="Main__Profile__Information--Content">
        <ProfileSectionToRender {...adminProfileCommonProps} />
      </section>
    </div>
  );
}
