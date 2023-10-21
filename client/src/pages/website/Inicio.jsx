// IMPORTAMOS LOS COMPONENTES A UTILIZAR
import Header from "../../components/website/Header";
import InicioPresentacion from "../../components/website/Inicio/InicioPresentacion";
import InicioVentajas from "../../components/website/Inicio/InicioVentajas";
import InicioServicios from "../../components/website/Inicio/InicioServicios";
import InicioMensaje from "../../components/website/Inicio/InicioMensaje";
import InicioEstandares from "../../components/website/Inicio/InicioEstandares";
import InicioMensajeContacto from "../../components/website/Inicio/InicioMensajeContacto";
import Footer from "../../components/website/Footer";

// IMPORTAMOS LOS ESTILOS PARA EL INICIO
import "../../styles/website/Inicio.css";

export default function Inicio() {
  return (
    <main className="Main__Home">
      <Header />
      <InicioPresentacion />
      <InicioVentajas />
      <InicioServicios />
      <InicioMensaje />
      <InicioEstandares />
      <InicioMensajeContacto />
      <Footer />
    </main>
  );
}
