/* eslint-disable react/prop-types */
import "../../../styles/website/TienesUnProyectoMensaje.css";

export default function TienesUnProyectoMensaje({
  content,
  backgroundColor = false,
}) {
  const contentWhyConsultantMessage = {
    One: {
      title: "Cuéntanos tu reto y buscamos la mejor solución",
      text: "Podemos realizar la combinación de diferentes expertos. En función del reto que nos presentes, gestionamos y dirigimos al talento para llegar a soluciones distintas a las habituales Ofrecemos unas respuestas ágiles a mejor precio que la competencia Disfrutarás de un gran servicio difícil de mejorar a un precio razonable, mejor que en una gran consultora.",
    },
    Two: {
      title: "Garantía de Consultor-ES",
      text: "Esta garantía nos permite ofrecerte libremente las habilidades de diversos colaboradores para así darte la mejor respuesta. Si no te funciona te ofrecemos otra opción.",
    },
    Three: {
      title: "Potencia tu efectividad comercial",
      text: "Siendo parte de nuestros clientes tendrás un nuevo canal de captación de consultores de cualquier especialidad, perfectamente compatible con tus necesidades.",
    },
    Four: {
      title: "Gana asesores cualificado",
      text: "Previamente filtramos todos los consultores que sean compatibles con tu proyecto, mostrándote las probabilidades que tienes de éxito para que puedas decidir por cual asesor decidirte.",
    },
  };

  const addClass = content;
  const classBackground = backgroundColor ? "Main__White" : "Main__Brown";

  return (
    <div className={classBackground}>
      <section className={`Main__HaveProject__Message ${addClass}`}>
        <p className="Main__HaveProject__Message--Title">
          {contentWhyConsultantMessage[content].title}
        </p>
        <p className="Main__HaveProject__Message--Title--Text">
          {contentWhyConsultantMessage[content].text}
        </p>
        <picture
          className={`Main__HaveProject__Message--Picture ${addClass}`}
        ></picture>
      </section>
    </div>
  );
}
