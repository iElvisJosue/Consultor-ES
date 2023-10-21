// IMPORTAMOS LOS COMPONENTES A UTILIZAR
import Header from "../../components/website/Header";
import QuieresSerUnConsultorPresentacion from "../../components/website/QuieresSerUnConsultor/QuieresSerUnConsultorPresentacion";
import QuieresSerUnConsultorMensaje from "../../components/website/QuieresSerUnConsultor/QuieresSerUnConsultorMensaje";
import QuieresSerUnConsultorBeneficios from "../../components/website/QuieresSerUnConsultor/QuieresSerUnConsultorBeneficios";
import QuieresSerUnConsultorCapacidades from "../../components/website/QuieresSerUnConsultor/QuieresSerUnConsultorCapacidades";
import QuieresSerUnConsultorPosicionamiento from "../../components/website/QuieresSerUnConsultor/QuieresSerUnConsultorPosicionamiento";
import Footer from "../../components/website/Footer";

// IMPORTAMOS LOS ESTILOS PARA EL INICIO
import "../../styles/website/QuieresSerUnConsultor.css";

export default function TienesUnProyecto() {
  return (
    <main className="Main__WantConsultant">
      <Header />
      <QuieresSerUnConsultorPresentacion />
      <QuieresSerUnConsultorMensaje content="One" backgroundColor={true} />
      <QuieresSerUnConsultorMensaje content="Two" hasTitle={false} />
      <QuieresSerUnConsultorBeneficios />
      <QuieresSerUnConsultorMensaje content="Three" />
      <QuieresSerUnConsultorMensaje content="Four" backgroundColor={true} />
      <QuieresSerUnConsultorCapacidades />
      <QuieresSerUnConsultorPosicionamiento />
      <Footer />
    </main>
  );
}
