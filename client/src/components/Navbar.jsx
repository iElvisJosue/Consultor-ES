/* eslint-disable react/prop-types */
import { useGlobal } from "../context/GlobalContext";
import { toast } from "sonner";
import NavbarConsultantProfile from "./Profile/NavbarConsultantProfile";

import Cookies from "js-cookie";
import "../styles/Navbar.css";

export default function Navbar({ navSection, setDataInfo }) {
  const { user, logout } = useGlobal();

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
    consultantProfile: <NavbarConsultantProfile setDataInfo={setDataInfo} />,
  };

  return (
    <nav className="Main__Navbar">
      <figure className="Main__Navbar--Logo">
        <img src="./LogoConsultores.png" alt="Logo de la empresa" />
      </figure>
      {navbarSection[navSection]}
      {/* <div className="Main__Navbar--Settings"> */}
      <button
        className="Main__Navbar--Options--Item"
        onClick={(e) => closingSession(e)}
      >
        <ion-icon name="log-out-outline"></ion-icon>
        <span>Salir</span>
      </button>
      {/* <figure className="Main__Navbar--Settings--Avatar">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
            alt="Imagen de perfil"
          />
        </figure> */}
      {/* </div> */}
    </nav>
  );
}
