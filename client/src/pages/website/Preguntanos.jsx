// IMPORTAMOS LOS COMPONENTES A UTILIZAR
import Header from "../../components/website/Header";
import PreguntanosFormulario from "../../components/website/Preguntanos/PreguntanosFormulario";
import PreguntanosAviso from "../../components/website/Preguntanos/PreguntanosAviso";
import Footer from "../../components/website/Footer";

// IMPORTAMOS LOS ESTILOS PARA EL INICIO
import "../../styles/website/Preguntanos.css";

export default function Preguntanos() {
  return (
    <main className="Main__AskUs">
      <Header />
      <PreguntanosFormulario />
      <PreguntanosAviso />
      <Footer />
    </main>
  );
}
