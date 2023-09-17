export default function Footer() {
  return (
    <footer className="Main__Footer">
      <b className="Main__Footer--Text">Contáctenos:</b>
      <span className="Main__Footer--Link">
        <a href="#" className="Main__Footer--Link--Facebook">
          <ion-icon name="logo-facebook"></ion-icon>
        </a>
        <a href="#" className="Main__Footer--Link--Twitter">
          <ion-icon name="logo-twitter"></ion-icon>
        </a>
        <a href="#" className="Main__Footer--Link--Whatsapp">
          <ion-icon name="logo-whatsapp"></ion-icon>
        </a>
        <a href="#" className="Main__Footer--Link--Instagram">
          <ion-icon name="logo-instagram"></ion-icon>
        </a>
        <a href="#" className="Main__Footer--Link--Mail">
          <ion-icon name="mail-outline"></ion-icon>
        </a>
      </span>
    </footer>
  );
}
