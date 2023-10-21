// IMPORTAMOS LOS COMPONENTES A UTILIZAR
import Header from "../../components/website/Header";
import TienesUnProyectoPresentacion from "../../components/website/TienesUnProyecto/TienesUnProyectoPresentacion";
import TienesUnProyectoPasos from "../../components/website/TienesUnProyecto/TienesUnProyectoPasos";
import TienesUnProyectoMensaje from "../../components/website/TienesUnProyecto/TienesUnProyectoMensaje";
import TienesUnProyectoRendimiento from "../../components/website/TienesUnProyecto/TienesUnProyectoRendimiento";
import Footer from "../../components/website/Footer";

// IMPORTAMOS LOS ESTILOS PARA EL INICIO
import "../../styles/website/TienesUnProyecto.css";

export default function TienesUnProyecto() {
  return (
    <main className="Main__HaveProject">
      <Header />
      <TienesUnProyectoPresentacion />
      <TienesUnProyectoMensaje content="One" backgroundColor={true} />
      <TienesUnProyectoMensaje content="Two" />
      <TienesUnProyectoPasos />
      <TienesUnProyectoMensaje content="Three" />
      <TienesUnProyectoMensaje content="Four" backgroundColor={true} />
      <TienesUnProyectoRendimiento />
      <Footer backgroundColor={true} />
    </main>
  );
}
