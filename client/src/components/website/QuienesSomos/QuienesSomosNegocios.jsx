import "../../../styles/website/QuienesSomosNegocios.css";

export default function QuienesSomosNegocios() {
  return (
    <div className="Main__Brown">
      <section className="Main__About__Business">
        <picture className="Main__About__Business--Picture--Left"></picture>
        <div className="Main__About__Business--Content">
          <p className="Main__About__Business--Title">
            Gestión empresarial de ciclo completo
          </p>
          <p className="Main__About__Business--Title--Text">
            Ya sea que busque consultoría financiera, evaluaciones de riesgo o
            una gestión provisional de recursos humanos, estamos listos para
            proporcionárselo. Tenemos una experiencia comprobada en cualquier
            proceso por el que vive y trabaja una empresa moderna.
          </p>
          <p className="Main__About__Business--Title">Marca tu propio ritmo</p>
          <p className="Main__About__Business--Title--Text">
            Estamos seguros de que objetivos claros, una filosofía de inversión
            a largo plazo, una cartera equilibrada y costes bajos crean un
            camino hacia sus objetivos financieros. Hay inversión y hay
            inversión inteligente. ¡Somos los últimos, somos los mejores!
          </p>
        </div>
        <picture className="Main__About__Business--Picture--Right"></picture>
      </section>
    </div>
  );
}
