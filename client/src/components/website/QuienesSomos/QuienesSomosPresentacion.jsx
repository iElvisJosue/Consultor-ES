import "../../../styles/website/QuienesSomosPresentacion.css";

export default function QuienesSomosPresentacion() {
  return (
    <div className="Main__Brown">
      <section className="Main__About__Presentation">
        <article className="Main__About__Presentation--Content">
          <div className="Main__About__Presentation--Content--Text">
            <p className="Main__About__Presentation--Content--Text--Title">
              ¿Quienes somos?
            </p>
            <p className="Main__About__Presentation--Content--Text--SubTitle">
              Somos una empresa que te ayuda a crear una estrategia que
              represente tu personalidad. Conocerlo es el objetivo principal de
              nuestros consultores.
              <br />
              <br />
              Combinando soporte práctico al cliente y prácticas corporativas
              líderes, apoyamos a las empresas a trabajar de manera más
              inteligente, más rápida y más flexible al acceder a una red
              seleccionada de los mejores profesionales de negocios
              independientes de Latino América.
            </p>
          </div>
          <picture className="Main__About__Presentation--Content--Image"></picture>
        </article>
      </section>
    </div>
  );
}
