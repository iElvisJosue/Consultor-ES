import "../../../styles/website/TienesUnProyectoRendimiento.css";

export default function TienesUnProyectoRendimiento() {
  return (
    <div className="Main__Brown">
      <section className="Main__HaveProject__Performance">
        <span className="Main__HaveProject__Performance--Details">
          <p className="Main__HaveProject__Performance--Details--Title">
            Mejora tu posicionamiento de mercado
          </p>
          <p className="Main__HaveProject__Performance--Details--Text">
            Contaras con el conocimiento especializad de nuestros asesores y
            colaboradores, incrementando la posibilidad de que tu marca mejore
            el posicionamiento en el mercado.
          </p>
          <a href="#" className="Main__HaveProject__Performance--Text--Button">
            <p className="Main__HaveProject__Performance--Text--Button--Text">
              Quiero mostrarte mi proyecto
            </p>
          </a>
        </span>
        <picture className="Main__HaveProject__Performance--Picture"></picture>
      </section>
    </div>
  );
}
