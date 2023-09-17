export default function Header() {
  return (
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
          <a href="#" className="Main__Header--Menu--Item--Link">
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
          <a href="/About" className="Main__Header--Menu--Item--Link">
            ¿Quienes somos?
          </a>
        </li>
        <li className="Main__Header--Menu--Item">
          <a href="#" className="Main__Header--Menu--Item--Link">
            Pregúntanos
          </a>
        </li>
        <li className="Main__Header--Menu--Item">
          <a href="/Login" className="Main__Header--Menu--Item--Link">
            Iniciar sesión
          </a>
        </li>
      </ul>
      <button className="Main__Header--Button">
        <ion-icon name="filter-outline"></ion-icon>
      </button>
    </header>
  );
}
