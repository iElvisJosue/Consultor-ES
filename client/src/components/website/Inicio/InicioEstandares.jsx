import "../../../styles/website/InicioEstandares.css";

export default function InicioEstandares() {
  return (
    <div className="Main__Brown">
      <section className="Main__Home__Standards">
        <picture className="Main__Home__Standards--Picture"></picture>
        <span className="Main__Home__Standards--Details">
          <p className="Main__Home__Standards--Details--Title">
            Exigimos los más altos estándares
          </p>
          <p className="Main__Home__Standards--Details--Details">
            Nuestro marco de cumplimiento y estándares de selección, le permite
            a nuestros clientes relacionarse con verdaderos expertos.
            <br />A través de una plataforma confiable, respaldada por
            herramientas hechas a la medida, protocolos bien pensados y
            profesionales capacitados para atenderte de manera oportuna.
            Nuestros consultores te apoyarán en brindarte la información
            necesaria para impulsar tu toma de decisiones
          </p>
        </span>
      </section>
    </div>
  );
}
