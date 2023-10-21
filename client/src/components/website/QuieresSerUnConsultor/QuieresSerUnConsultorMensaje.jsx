/* eslint-disable react/prop-types */
import "../../../styles/website/QuieresSerUnConsultorMensaje.css";

export default function QuieresSerUnConsultorMensaje({
  hasTitle = true,
  content,
  backgroundColor = false,
}) {
  const contentWhyConsultantMessage = {
    One: {
      title: "Conviértete en uno de nuestro consultores expertos",
      text: "1.- CREAR TU CV: Conocer tu trayectoria y la experiencia profesional que has adquirido al paso de los años es importante para evaluarte como candidato. 2.- AGENDA UNA ENTREVISTA: Una vez que analizamos tu trayectoria, podrás ser entrevistado por nuestro equipo de expertos para pasar a la siguiente fase de selección de consultores.",
    },
    Two: {
      text: "3.- REALIZA EL EXAMEN: Nuestros clientes requieren de expertos globales con amplio dominio de su área de conocimiento, es por ello que exigen una evaluación escrita para validar sus aptitudes. 4.- CERTIFICATE: Una vez aceptado, tendrás una capacitación con nuestro equipo de profesionales para que puedas otorgar sesiones de clase mundial.",
    },
    Three: {
      title: "Potencia tu efectividad comercial",
      text: "Siendo parte de nuestros clientes tendrás un nuevo canal de captación de consultores de cualquier especialidad, perfectamente compatible con tus necesidades.",
    },
    Four: {
      title: "Gana proyectos cualificados",
      text: "Previamente filtramos todos los proyectos diciéndote las probabilidades que tienes de éxito para que puedas decidir cuánto esfuerzo dedicas.",
    },
  };

  const addClass = content;
  const classBackground = backgroundColor ? "Main__White" : "Main__Brown";

  return (
    <div className={classBackground}>
      <section className={`Main__WantConsultant__Message ${addClass}`}>
        {hasTitle && (
          <p className="Main__WantConsultant__Message--Title">
            {contentWhyConsultantMessage[content].title}
          </p>
        )}
        <p className="Main__WantConsultant__Message--Title--Text">
          {contentWhyConsultantMessage[content].text}
        </p>
        <picture
          className={`Main__WantConsultant__Message--Picture ${addClass}`}
        ></picture>
      </section>
    </div>
  );
}
