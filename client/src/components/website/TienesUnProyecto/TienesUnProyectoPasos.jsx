import "../../../styles/website/TienesUnProyectoPasos.css";

export default function TienesUnProyectoPasos() {
  return (
    <div className="Main__White">
      <section className="Main__HaveProject__Steps">
        <picture className="Main__HaveProject__Steps--Picture--Left"></picture>
        <div className="Main__HaveProject__Steps--Content">
          <p className="Main__HaveProject__Steps--Title">Sigue estos pasos</p>
          <p className="Main__HaveProject__Steps--Title--Text">
            - Primero cuéntanos tu proyecto.
            <br />
            <br />- Después nosotros te presentamos más de una opción para
            solucionarlo.
            <br />
            <br />
            - Al final escoges el que más se adapte a tus necesidades.
            <br />
            <br />Y después nos corresponde Comenzar.
          </p>
          <a href="#" className="Main__HaveProject__Steps--Text--Button">
            <p className="Main__HaveProject__Steps--Text--Button--Text">
              Quiero mostrarte mi proyecto
            </p>
          </a>
        </div>
        <picture className="Main__HaveProject__Steps--Picture--Right"></picture>
      </section>
    </div>
  );
}
