import "../../../styles/website/ParaQueUnConsultorMensaje.css";

// eslint-disable-next-line react/prop-types
export default function ParaQueUnConsultorMensaje({ content }) {
  const contentWhyConsultantMessage = {
    1: {
      title: "Marca tu propio ritmo",
      text: "Estamos seguros de que objetivos claros, una filosofía de inversión a largo plazo, una cartera equilibrada y costes bajos crean un camino hacia sus objetivos financieros. Hay inversión y hay inversión inteligente. ¡Somos los últimos, somos los mejores!",
    },
    2: {
      title: "Gestión empresarial de ciclo completo",
      text: "Ya sea que busque consultoría financiera, evaluaciones de riesgo o una gestión provisional de recursos humanos, estamos listos para proporcionárselo. Tenemos una experiencia comprobada en cualquier proceso por el que vive y trabaja una empresa moderna",
    },
  };

  const addClass = content === "1" ? "One" : "Two";
  const classBackground = content === "1" ? "Main__Brown" : "Main__White";

  return (
    <div className={classBackground}>
      <section className={`Main__WhyConsultant__Message ${addClass}`}>
        <p className="Main__WhyConsultant__Message--Title">
          {contentWhyConsultantMessage[content].title}
        </p>
        <p className="Main__WhyConsultant__Message--Title--Text">
          {contentWhyConsultantMessage[content].text}
        </p>
        <picture
          className={`Main__WhyConsultant__Message--Picture ${addClass}`}
        ></picture>
      </section>
    </div>
  );
}
