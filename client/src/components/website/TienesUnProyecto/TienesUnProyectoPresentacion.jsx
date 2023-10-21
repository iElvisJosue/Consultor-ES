import "../../../styles/website/TienesUnProyectoPresentacion.css";

export default function TienesUnProyectoPresentacion() {
  return (
    <div className="Main__Brown">
      <section className="Main__HaveProject__Presentation">
        <article className="Main__HaveProject__Presentation--Content">
          <div className="Main__HaveProject__Presentation--Content--Text">
            <p className="Main__HaveProject__Presentation--Content--Text--Title">
              ¿Necesitas ayuda para encontrar la mejor solución a tus retos?
            </p>
            <p className="Main__HaveProject__Presentation--Content--Text--SubTitle">
              Combinamos lo mejor de cada especialista y/o tecnologías para
              ofrecerte la mejor solución posible.
            </p>
            <a
              href="#"
              className="Main__HaveProject__Presentation--Content--Text--Button"
            >
              <p className="Main__HaveProject__Presentation--Content--Text--Button--Text">
                Quiero mostrarte mi proyecto
              </p>
            </a>
          </div>
          <picture className="Main__HaveProject__Presentation--Content--Image"></picture>
        </article>
      </section>
    </div>
  );
}
