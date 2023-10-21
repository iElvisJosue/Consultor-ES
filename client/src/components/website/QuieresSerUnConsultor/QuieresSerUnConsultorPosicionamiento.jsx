import "../../../styles/website/QuieresSerUnConsultorPosicionamiento.css";

export default function QuieresSerUnConsultorPosicionamiento() {
  return (
    <div className="Main__White">
      <section className="Main__WantConsultant__Position">
        <span className="Main__WantConsultant__Position--Details">
          <p className="Main__WantConsultant__Position--Details--Title">
            Mejora tu posicionamiento de mercado
          </p>
          <p className="Main__WantConsultant__Position--Details--Text">
            Contactarás con nuevos clientes y colaboradores, incrementando la
            visibilidad de tu marca y mejorando el posicionamiento de tu
            negocio.
          </p>
          <a
            href="/CodigoDelConsultor"
            className="Main__WantConsultant__Position--Text--Button"
          >
            <p className="Main__WantConsultant__Position--Text--Button--Text">
              Código del consultor
            </p>
          </a>
          <a
            href="/IniciarSesion"
            className="Main__WantConsultant__Position--Text--Button"
          >
            <p className="Main__WantConsultant__Position--Text--Button--Text">
              Quiero mostrarte mi proyecto
            </p>
          </a>
        </span>
        <picture className="Main__WantConsultant__Position--Picture"></picture>
      </section>
    </div>
  );
}
