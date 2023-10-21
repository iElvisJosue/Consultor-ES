/* eslint-disable react/prop-types */

// CONTEXTOS A USAR
import { useGlobal } from "../../../context/GlobalContext";

// HOOKS A USAR
import useShowMenu from "../../../hooks/useShowMenu";

// COMPONENTES A USAR
import PerfilMenuConsultor from "./PerfilMenuConsultor";
import PerfilMenuCliente from "./PerfilMenuCliente";

// ESTILOS A USAR
import "../../../styles/webapp/Menu.css";

export default function PerfilMenu({ setElementID, changeMenu, menu }) {
  const { showMenu, setShowMenu } = useShowMenu();
  const { user } = useGlobal();
  const { userName, role } = user;

  const menuProps = {
    setElementID,
    changeMenu,
    menu,
  };

  const profileMenuToRender = {
    Consultor: PerfilMenuConsultor,
    Cliente: PerfilMenuCliente,
    //   Administrador: <PerfilMenuAdmin />,
  };

  const MenuToRender = profileMenuToRender[role];

  const classMenuOptions = showMenu
    ? "Main__Profile__Information--Menu Show"
    : "Main__Profile__Information--Menu";

  return (
    <aside className={classMenuOptions}>
      <div className="Main__Profile__Information--Menu--Profile">
        <picture className="Main__Profile__Information--Menu--Profile--Picture">
          <img src="./CEO.png" alt="Imagen de perfil" />
        </picture>
        <p className="Main__Profile__Information--Menu--Profile--Name">
          {userName}
        </p>
        <button
          className="Main__Profile__Information--Menu--Profile--Button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <ion-icon name="chevron-down-outline"></ion-icon>
        </button>
      </div>
      <MenuToRender {...menuProps} />
    </aside>
  );
}
