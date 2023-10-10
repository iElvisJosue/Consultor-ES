/* eslint-disable react/prop-types */
import { useGlobal } from "../context/GlobalContext";
import { useState } from "react";
import { toast } from "sonner";
import NavbarConsultantProfile from "./Profile/NavbarConsultantProfile";
import NavbarConsultantAddCV from "./Profile/NavbarConsultantAddCV";

import Cookies from "js-cookie";
import "../styles/Navbar.css";

export default function Navbar({ navSection, setDataInfo }) {
  const { user, logout } = useGlobal();
  const [showSettings, setShowSettings] = useState(false);

  const closingSession = (e) => {
    e.preventDefault();
    const promise = new Promise(() => {
      setTimeout(() => {
        logout({ id: user._id });
        Cookies.remove("accessToken");
        return;
      }, 1500);
    });

    toast.promise(promise, {
      loading: "Cerrando sesión...",
    });
  };

  const navbarSection = {
    consultantAddCV: <NavbarConsultantAddCV setDataInfo={setDataInfo} />,
    consultantProfile: <NavbarConsultantProfile setDataInfo={setDataInfo} />,
  };

  const handleShowSettings = () => {
    setShowSettings(!showSettings);
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
          <li>
            <ion-icon name="settings-outline"></ion-icon>Configuración
          </li>
        </ul>
      </div>
    </nav>
  );
}
