import "../../../styles/website/QuieresSerUnConsultorPresentacion.css";

export default function QuieresSerUnConsultorPresentacion() {
  return (
    <div className="Main__Brown">
      <section className="Main__WantConsultant__Presentation">
        <article className="Main__WantConsultant__Presentation--Content">
          <div className="Main__WantConsultant__Presentation--Content--Text">
            <p className="Main__WantConsultant__Presentation--Content--Text--Title">
              ¿Quieres ser un consultor?
            </p>
            <p className="Main__WantConsultant__Presentation--Content--Text--SubTitle">
              “En Consultor-ES podrás elegir tus proyectos, llegar a más
              clientes y contar con un equipo profesional que te apoyará en todo
              momento” Conviértete en parte de nuestros socios como consultor
              experto dando de alta tu CV.
            </p>
            <a
              href="/CodigoDelConsultor"
              className="Main__WantConsultant__Presentation--Content--Text--Button"
            >
              <p className="Main__WantConsultant__Presentation--Content--Text--Button--Text">
                Código del consultor
              </p>
            </a>
          </div>
          <picture className="Main__WantConsultant__Presentation--Content--Image"></picture>
        </article>
      </section>
    </div>
  );
}
