import "../../../styles/website/PreguntanosAviso.css";

export default function PreguntanosAviso() {
  const contentText = [
    {
      title: "Responsable de datos:",
      text: "Consultor-Es.",
    },
    {
      title: "Finalidad:",
      text: "Responder dudas y puntualmente envío por mail de noticias y ofertas.",
    },
    {
      title: "Legitimación:",
      text: "Tu consentimiento expreso.",
    },
    {
      title: "Destinatario:",
      text: "Lista de suscriptores alojada en consultor-es.com.mx",
    },
    {
      title: "Derechos:",
      text: "Acceso, rectificación, supresión, anonimato, portabilidad y olvido de tus datos.",
    },
  ];

  return (
    <div className="Main__Brown">
      <section className="Main__AskUs__Notice">
        <span className="Main__AskUs__Notice--Details">
          {contentText.map(({ title, text }, index) => (
            <p className="Main__AskUs__Notice--Details--Text" key={index}>
              <strong>{title}</strong> {text}
            </p>
          ))}
        </span>
        <picture className="Main__AskUs__Notice--Picture"></picture>
      </section>
    </div>
  );
}
