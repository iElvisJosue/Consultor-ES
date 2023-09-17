export default function AboutAdvantages() {
  const ServicesContent = [
    {
      img: "./Efficiency.png",
      title: "EFICIENCIA",
      text: "Los consultores independientes suelen tener una amplia experiencia y conocimientos en su área de especialización. Esto les permite ofrecer soluciones rápidas y eficientes a los problemas de las empresas.",
    },
    {
      img: "./Neutrality.png",
      title: "OBJETIVIDAD",
      text: "Los consultores independientes no tienen ningún interés personal en la empresa, por lo que pueden ofrecer consejos imparciales y objetivos.",
    },
    {
      img: "./Flexibility.png",
      title: "FLEXIBILIDAD",
      text: "Los consultores independientes pueden adaptar sus servicios a las necesidades específicas de cada empresa.",
    },
  ];

  const serviceContent = ServicesContent.map((content, index) => {
    return (
      <article
        className="Main__About--Advantages--Content--Article"
        key={index}
      >
        <picture className="Main__About--Advantages--Content--Article--Picture">
          <img src={content.img} alt="Mejores talentos" />
        </picture>
        <p className="Main__About--Advantages--Content--Article--Title">
          {content.title}
        </p>
        <p className="Main__About--Advantages--Content--Article--Details">
          {content.text}
        </p>
      </article>
    );
  });

  return (
    <section className="Main__About--Advantages">
      <p className="Main__About--Advantages--Title">
        Las empresas obtienen una serie de ventajas al contratar consultores
        independientes
      </p>
      <div className="Main__About--Advantages--Content">{serviceContent}</div>
    </section>
  );
}
