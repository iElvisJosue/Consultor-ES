import "../../styles/website/Footer.css";

// eslint-disable-next-line react/prop-types
export default function Footer({ backgroundColor = false }) {
  const footerOptions = [
    {
      classNameOption: "Main__Footer--Link--Twitter",
      iconNameOption: "logo-facebook",
      linkOption: "#",
    },
    {
      classNameOption: "Main__Footer--Link--Facebook",
      iconNameOption: "logo-twitter",
      linkOption: "#",
    },
    {
      classNameOption: "Main__Footer--Link--Whatsapp",
      iconNameOption: "logo-instagram",
      linkOption: "#",
    },
    {
      classNameOption: "Main__Footer--Link--Instagram",
      iconNameOption: "logo-whatsapp",
      linkOption: "#",
    },
    {
      classNameOption: "Main__Footer--Link--Mail",
      iconNameOption: "mail-outline",
      linkOption: "#",
    },
  ];

  const classFooterBackground = backgroundColor ? "Main__White" : "Main__Brown";

  return (
    <div className={classFooterBackground}>
      <footer className="Main__Footer">
        <b className="Main__Footer--Text">Contáctenos:</b>
        <span className="Main__Footer--Link">
          {footerOptions.map(
            ({ classNameOption, iconNameOption, linkOption }, index) => (
              <a href={linkOption} className={classNameOption} key={index}>
                <ion-icon name={iconNameOption}></ion-icon>
              </a>
            )
          )}
        </span>
      </footer>
    </div>
  );
}
