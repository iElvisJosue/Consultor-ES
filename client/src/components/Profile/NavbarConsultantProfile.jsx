/* eslint-disable react/prop-types */
export default function NavbarAddCV({ setDataInfo }) {
  return (
    <ul className="Main__Navbar--Options">
      <li
        className="Main__Navbar--Options--Item"
        onClick={() => setDataInfo("CV")}
      >
        <ion-icon name="document-text-outline"></ion-icon>
        <p>CV</p>
      </li>
      <li
        className="Main__Navbar--Options--Item"
        onClick={() => setDataInfo("BANK")}
      >
        <ion-icon name="card-outline"></ion-icon>
        <p>Banco</p>
      </li>
      <li
        className="Main__Navbar--Options--Item"
        onClick={() => setDataInfo("PROJECTS")}
      >
        <ion-icon name="search"></ion-icon>
        <p>Proyectos</p>
      </li>
    </ul>
  );
}
