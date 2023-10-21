import { useState } from "react";

// IMPORTAMOS LOS ESTILOS PARA EL HEADER
import "../../styles/website/Header.css";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const classMenu = showMenu
    ? "Main__Header--Navbar Show"
    : "Main__Header--Navbar";

  const menuOption = [
    {
      title: "¿Para qué un consultor?",
      link: "/ParaQueUnConsultor",
    },
    {
      title: "¿Quieres ser un consultor?",
      link: "/QuieresSerUnConsultor",
    },
    {
      title: "¿Tienes un proyecto?",
      link: "/TienesUnProyecto",
    },
    {
      title: "¿Quienes somos?",
      link: "/QuienesSomos",
    },
    {
      title: "Pregúntanos",
      link: "/Preguntanos",
    },
    {
      title: "Misión y Visión",
      link: "/MisionVision",
    },
    {
      title: "Iniciar Sesión",
      link: "/IniciarSesion",
    },
  ];

  return (
    <>
      <header className="Main__Header">
        <a href="/" className="Main__Header--Picture">
          <img
            src="./LogoConsultores.png"
            alt="Logo de la empresa"
            className="Main__Header--Picture--Img"
          />
        </a>
        <ul className="Main__Header--Menu">
          {menuOption.map(({ title, link }, index) => (
            <li className="Main__Header--Menu--Item" key={index}>
              <a href={link} className="Main__Header--Menu--Item--Link">
                {title}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="Main__Header--Button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <ion-icon name="filter-outline"></ion-icon>
        </button>
      </header>
      <div className={classMenu}>
        <button onClick={() => setShowMenu(!showMenu)}>Cerrar</button>
        <a href="/ParaQueUnConsultor">¿Para qué un consultor?</a>
        <a href="/QuieresSerUnConsultor">¿Quieres ser un consultor?</a>
        <a href="/TienesUnProyecto">¿Tienes Un Proyecto?</a>
        <a href="/QuienesSomos">¿Quienes somos?</a>
        <a href="/Preguntanos">Pregúntanos</a>
        <a href="/MisionVision">Misión y Visión</a>
        <a href="/IniciarSesion">Iniciar sesión</a>
      </div>
    </>
  );
}
