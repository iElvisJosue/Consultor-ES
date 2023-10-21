// IMPORTAMOS LOS COMPONENTES A UTILIZAR
import Header from "../../components/website/Header";
import CodigoDelConsultorMensaje from "../../components/website/CodigoDelConsultor/CodigoDelConsultorMensaje";
import CodigoDelConsultorEslogan from "../../components/website/CodigoDelConsultor/CodigoDelConsultorEslogan";
import Footer from "../../components/website/Footer";

// IMPORTAMOS LOS ESTILOS PARA EL INICIO
import "../../styles/website/CodigoDelConsultor.css";

export default function CodigoDelConsultor() {
  return (
    <main className="Main__CodeConsultant">
      <Header />
      <CodigoDelConsultorMensaje />
      <CodigoDelConsultorEslogan />
      <Footer backgroundColor={true} />
    </main>
  );
}
