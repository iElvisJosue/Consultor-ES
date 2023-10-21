/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
// import { toast } from "sonner";
// import Cookies from "js-cookie";

// CONTEXTOS A USAR
import { useGlobal } from "../../../context/GlobalContext";

// COMPONENTES A USAR
import NavbarAgregarCV from "./NavbarAgregarCV";

// HOOKS A USAR
import useLogout from "../../../hooks/useLogout";

// ESTILOS A USAR
import "../../../styles/webapp/Navbar.css";

export default function Navbar({ navSection }) {
  const { user } = useGlobal();
  const { closingSession } = useLogout();
  const [showSettings, setShowSettings] = useState(false);

  const handleShowSettings = () => {
    setShowSettings(!showSettings);
  };
  const navbarSection = {
    NavbarAgregarCV: <NavbarAgregarCV />,
    // consultantProfile: <NavbarConsultantProfile setDataInfo={setDataInfo} />,
  };
  const classMenuSettings = showSettings
    ? "Main__Navbar--Settings--Options Show"
    : "Main__Navbar--Settings--Options";

  return (
    <nav className="Main__Navbar">
      {navbarSection[navSection]}
      <div className="Main__Navbar--Settings">
        <span className="Main__Navbar--Settings--Name">{user.userName}</span>
        <figure
          className="Main__Navbar--Settings--Avatar"
          onClick={handleShowSettings}
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
            alt="Imagen de perfil"
          />
        </figure>
        <ul className={classMenuSettings}>
          <li onClick={closingSession}>
            <ion-icon name="log-out-outline"></ion-icon>Salir
          </li>
        </ul>
      </div>
    </nav>
  );
}
