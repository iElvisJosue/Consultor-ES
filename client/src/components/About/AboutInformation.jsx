// eslint-disable-next-line react/prop-types
export default function AboutInformation({ content }) {
  const contentAboutInformation = {
    1: (
      <p className="Main__About__Information--Details--Text">
        Con nosotros no existen desventajas a la hora de trabajar por proyecto
        con consultores independientes. Nuestros consultores independientes
        serán seleccionados con la capacidad de para familiarizase con la
        cultura y los procesos de la empresa como si fueran empleados fijos.
        Además, nuestros consultores independientes siempre estarán disponibles
        para trabajar a largo plazo o en proyectos de gran envergadura
      </p>
    ),
    2: (
      <p className="Main__About__Information--Details--Text">
        Las empresas deberán determinar las necesidades específicas del
        proyecto. Antes de contratar a un consultor independiente, es importante
        tener claro cuáles son los objetivos y el alcance del proyecto.
        <br /> <br />
        Nos encargaremos de establecer un contrato claro, que especifique los
        términos y condiciones del servicio.
        <br />
        <br />
        No necesita estar investigar a consultores independientes por fuera.
        Para nosotros usted es importante y nos aseguramos de que nuestros
        consultores tienen la experiencia y los conocimientos necesarios para
        completar el proyecto.
      </p>
    ),
  };

  const classForInformation =
    content === "1"
      ? "Main__About__Information One"
      : "Main__About__Information Two";

  return (
    <section className={classForInformation}>
      <span className="Main__About__Information--Details">
        {contentAboutInformation[content]}
      </span>
      <picture className="Main__About__Information--Picture"></picture>
    </section>
  );
}
