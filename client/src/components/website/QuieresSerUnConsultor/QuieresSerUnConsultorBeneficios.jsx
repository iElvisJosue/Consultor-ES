import "../../../styles/website/QuieresSerUnConsultorBeneficios.css";

export default function QuieresSerUnConsultorBeneficios() {
  return (
    <div className="Main__White">
      <section className="Main__WantConsultant__Benefits">
        <picture className="Main__WantConsultant__Benefits--Picture--Left"></picture>
        <div className="Main__WantConsultant__Benefits--Content">
          <p className="Main__WantConsultant__Benefits--Title">
            Beneficios de unirte a nuestro ecosistema
          </p>
          <a
            href="/CodigoDelConsultor"
            className="Main__WantConsultant__Benefits--Text--Button"
          >
            <p className="Main__WantConsultant__Benefits--Text--Button--Text">
              Código del consultor
            </p>
          </a>
          <a
            href="/IniciarSesion"
            className="Main__WantConsultant__Benefits--Text--Button"
          >
            <p className="Main__WantConsultant__Benefits--Text--Button--Text">
              Quiero ser parte de sus expertos
            </p>
          </a>
        </div>
        <picture className="Main__WantConsultant__Benefits--Picture--Right"></picture>
      </section>
    </div>
  );
}
