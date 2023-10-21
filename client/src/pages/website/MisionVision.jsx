// IMPORTAMOS LOS COMPONENTES A UTILIZAR
import Header from "../../components/website/Header";
import MisionVisionPresentacion from "../../components/website/MisionVision/MisionVisionPresentacion";
import MisionVisionVentajas from "../../components/website/MisionVision/MisionVisionVentajas";
import MisionVisionValores from "../../components/website/MisionVision/MisionVisionValores";
import MisionVisionAcceso from "../../components/website/MisionVision/MisionVisionAcceso";
import Footer from "../../components/website/Footer";

// IMPORTAMOS LOS ESTILOS PARA EL INICIO
import "../../styles/website/MisionVision.css";

export default function MisionVision() {
  return (
    <main className="Main__Mission">
      <Header />
      <MisionVisionPresentacion />
      <MisionVisionVentajas />
      <MisionVisionValores />
      <MisionVisionAcceso />
      <Footer />
    </main>
  );
}
