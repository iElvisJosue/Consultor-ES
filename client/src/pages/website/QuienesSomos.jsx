// IMPORTAMOS LOS COMPONENTES A UTILIZAR
import Header from "../../components/website/Header";
import QuienesSomosPresentacion from "../../components/website/QuienesSomos/QuienesSomosPresentacion";
import QuienesSomosNegocios from "../../components/website/QuienesSomos/QuienesSomosNegocios";
import QuienesSomosTalento from "../../components/website/QuienesSomos/QuienesSomosTalento";
import QuienesSomosMensaje from "../../components/website/QuienesSomos/QuienesSomosMensaje";
import QuienesSomosInformacion from "../../components/website/QuienesSomos/QuienesSomosInformacion";
import Footer from "../../components/website/Footer";

// IMPORTAMOS LOS ESTILOS PARA EL INICIO
import "../../styles/website/QuienesSomos.css";

export default function QuienesSomos() {
  return (
    <main className="Main__About">
      <Header />
      <QuienesSomosPresentacion />
      <QuienesSomosTalento />
      <QuienesSomosNegocios />
      <QuienesSomosMensaje />
      <QuienesSomosInformacion />
      <Footer backgroundColor={true} />
    </main>
  );
}
