// IMPORTAMOS LOS COMPONENTES A UTILIZAR
import Header from "../../components/website/Header";
import ParaQueUnConsultorPresentacion from "../../components/website/ParaQueUnConsultor/ParaQueUnConsultorPresentacion";
import ParaQueUnConsultorAyuda from "../../components/website/ParaQueUnConsultor/ParaQueUnConsultorAyuda";
import ParaQueUnConsultorMensaje from "../../components/website/ParaQueUnConsultor/ParaQueUnConsultorMensaje";
import ParaQueUnConsultorVentajas from "../../components/website/ParaQueUnConsultor/ParaQueUnConsultorVentajas";
import ParaQueUnConsultorInnovacion from "../../components/website/ParaQueUnConsultor/ParaQueUnConsultorInnovacion";
import Footer from "../../components/website/Footer";

// IMPORTAMOS LOS ESTILOS PARA EL INICIO
import "../../styles/website/ParaQueUnConsultor.css";

export default function ParaQueUnConsultor() {
  return (
    <main className="Main__WhyConsultant">
      <Header />
      <ParaQueUnConsultorPresentacion />
      <ParaQueUnConsultorAyuda />
      <ParaQueUnConsultorMensaje content="1" />
      <ParaQueUnConsultorMensaje content="2" />
      <ParaQueUnConsultorVentajas />
      <ParaQueUnConsultorInnovacion />
      <Footer />
    </main>
  );
}
