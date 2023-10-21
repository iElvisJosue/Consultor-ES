import "../../../styles/website/InicioPresentacion.css";

export default function InicioPresentacion() {
  return (
    <div className="Main__Brown">
      <section className="Main__Home__Presentation">
        <article className="Main__Home__Presentation__Content">
          <div className="Main__Home__Presentation__Content--Text">
            <p className="Main__Home__Presentation__Content--Text--Title">
              Somos la plataforma digital que reúne a los mejores consultores en
              México y América Latina
            </p>
            <p className="Main__Home__Presentation__Content--Text--SubTitle">
              Las empresas pueden obtener una serie de ventajas al contratar
              consultores independientes
            </p>
            <a
              href="#"
              className="Main__Home__Presentation__Content--Text--Button"
            >
              <p className="Main__Home__Presentation__Content--Text--Button--Text">
                Conoce más
              </p>
            </a>
          </div>
          <picture className="Main__Home__Presentation__Content--Image"></picture>
        </article>
      </section>
    </div>
  );
}
