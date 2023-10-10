import { useState } from "react";
import "../styles/Header.css";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const classMenu = showMenu
    ? "Main__Header--Navbar Show"
    : "Main__Header--Navbar";

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
          <li className="Main__Header--Menu--Item">
            <a
              href="/ParaQueUnConsultor"
              className="Main__Header--Menu--Item--Link"
            >
              ¿Para qué un consultor?
            </a>
          </li>
          <li className="Main__Header--Menu--Item">
            <a href="#" className="Main__Header--Menu--Item--Link">
              ¿Quieres ser un consultor?
            </a>
          </li>
          <li className="Main__Header--Menu--Item">
            <a href="#" className="Main__Header--Menu--Item--Link">
              ¿Tienes un proyecto?
            </a>
          </li>
          <li className="Main__Header--Menu--Item">
            <a href="/QuienesSomos" className="Main__Header--Menu--Item--Link">
              ¿Quienes somos?
            </a>
          </li>
          <li className="Main__Header--Menu--Item">
            <a href="#" className="Main__Header--Menu--Item--Link">
              Pregúntanos
            </a>
          </li>
          <li className="Main__Header--Menu--Item">
            <a href="/IniciarSesion" className="Main__Header--Menu--Item--Link">
              Iniciar sesión
            </a>
          </li>
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
        <a href="/QuienesSomos">¿Quienes somos?</a>
        <a href="/ParaQueUnConsultor">¿Para qué un consultor?</a>
        <a href="/IniciarSesion">Iniciar sesión</a>
      </div>
    </>
  );
}
