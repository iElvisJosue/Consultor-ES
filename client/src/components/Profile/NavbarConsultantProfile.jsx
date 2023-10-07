/* eslint-disable react/prop-types */
export default function NavbarAddCV({ setDataInfo }) {
  return (
    <ul className="Main__Navbar--Options">
      <li
        className="Main__Navbar--Options--Item"
        onClick={() => setDataInfo("CV")}
      >
        <ion-icon name="document-lock-outline"></ion-icon>
        <p>Currículum</p>
      </li>
      <li
        className="Main__Navbar--Options--Item"
        onClick={() => setDataInfo("BANK")}
      >
        <ion-icon name="card-outline"></ion-icon>
        <p>Datos bancarios</p>
      </li>
      <li
        className="Main__Navbar--Options--Item"
        onClick={() => setDataInfo("PROJECTS")}
      >
        <ion-icon name="medkit-outline"></ion-icon>
        <p>Proyectos disponibles</p>
      </li>
    </ul>
  );
}
