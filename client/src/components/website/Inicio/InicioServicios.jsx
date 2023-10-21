import "../../../styles/website/InicioServicios.css";

export default function InicioServicios() {
  const ServicesContent = [
    {
      img: "./Talentos.png",
      title: "Consultores independientes",
      text: "Acceda a consultores independientes capacitados, además de expertos y ejecutivos con experiencia en las empresas más exitosas de México y América Latina.",
    },
    {
      img: "./Up.png",
      title: "Servicio de clase mundial",
      text: "Obtenga el nivel de servicio que necesita para evaluar el trabajo, presentar una lista seleccionada de candidatos y gestionar toda la contratación y el cumplimiento.",
    },
    {
      img: "./Expertos.png",
      title: "Acceso a los mejores talentos y habilidades",
      text: "Ya sea que desee flexibilizar su equipo, reducir el gasto en consultoría o acceder a habilidades o experiencia en demanda, obtenga las mejores mentes empresariales con experiencia en las industrias, funciones y capacidades que necesita.",
    },
  ];

  const serviceContent = ServicesContent.map((content, index) => {
    return (
      <article className="Main__Home__Services--Content--Article" key={index}>
        <picture className="Main__Home__Services--Content--Article--Picture">
          <img src={content.img} alt="Mejores talentos" />
        </picture>
        <p className="Main__Home__Services--Content--Article--Title">
          {content.title}
        </p>
        <p className="Main__Home__Services--Content--Article--Details">
          {content.text}
        </p>
      </article>
    );
  });

  return (
    <div className="Main__Home__Brown">
      <section className="Main__Home__Services">
        <p className="Main__Home__Services--Title">¿Qué le ofrecemos?</p>
        <div className="Main__Home__Services--Content">{serviceContent}</div>
      </section>
    </div>
  );
}
