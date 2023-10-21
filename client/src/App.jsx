import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { ConsultantProvider } from "./context/ConsultantContext";
import { ClientProvider } from "./context/ClientContext";

// IMPORTAMOS LAS PÁGINAS DEL WEBSITE
import Inicio from "./pages/website/Inicio";
import ParaQueUnConsultor from "./pages/website/ParaQueUnConsultor";
import QuieresSerUnConsultor from "./pages/website/QuieresSerUnConsultor";
import TienesUnProyecto from "./pages/website/TienesUnProyecto";
import QuienesSomos from "./pages/website/QuienesSomos";
import Preguntanos from "./pages/website/Preguntanos";
import MisionVision from "./pages/website/MisionVision";
import CodigoDelConsultor from "./pages/website/CodigoDelConsultor";
// IMPORTAMOS LAS PÁGINAS DE LA APP
import IniciarSesion from "./pages/webapp/IniciarSesion";
import VerificacionDeCorreo from "./pages/webapp/VerificacionDeCorreo";
import VerificacionDeCodigo from "./pages/webapp/VerificacionDeCodigo";
import RegistroDeDatos from "./pages/webapp/RegistroDeDatos";
import Perfil from "./pages/webapp/Perfil";
// PROTECCIÓN DE RUTAS
import ProtectedByCookies from "./protection/ProtectedByCookies";
import ProtectedForClients from "./protection/ProtectedForClients";
import ProtectedForConsultants from "./protection/ProtectedForConsultants";
import ProtectedByUserStatus from "./protection/ProtectedByUserStatus";

// IMPORTAMOS LOS ESTILOS DE LA PAGINA
import "./index.css";

function App() {
  return (
    <GlobalProvider>
      <ConsultantProvider>
        <ClientProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route
                path="/ParaQueUnConsultor"
                element={<ParaQueUnConsultor />}
              />
              <Route
                path="/QuieresSerUnConsultor"
                element={<QuieresSerUnConsultor />}
              />
              <Route path="/TienesUnProyecto" element={<TienesUnProyecto />} />
              <Route path="/QuienesSomos" element={<QuienesSomos />} />
              <Route path="/Preguntanos" element={<Preguntanos />} />
              <Route path="/MisionVision" element={<MisionVision />} />
              <Route
                path="/CodigoDelConsultor"
                element={<CodigoDelConsultor />}
              />
              <Route path="/IniciarSesion" element={<IniciarSesion />} />
              <Route
                path="/ClienteVerificacionDeCorreo"
                element={<VerificacionDeCorreo role="Cliente" />}
              />
              <Route
                path="/ConsultorVerificacionDeCorreo"
                element={<VerificacionDeCorreo role="Consultor" />}
              />
              <Route element={<ProtectedByCookies />}>
                <Route element={<ProtectedForConsultants />}>
                  <Route
                    path="/ConsultorVerificacionDeCodigo"
                    element={<VerificacionDeCodigo role="Consultor" />}
                  />
                  <Route
                    path="/ConsultorRegistroDeDatos"
                    element={<RegistroDeDatos role="Consultor" />}
                  />
                </Route>
                <Route element={<ProtectedForClients />}>
                  <Route
                    path="/ClienteVerificacionDeCodigo"
                    element={<VerificacionDeCodigo role="Cliente" />}
                  />
                  <Route
                    path="/ClienteRegistroDeDatos"
                    element={<RegistroDeDatos role="Cliente" />}
                  />
                </Route>
                <Route element={<ProtectedByUserStatus />}>
                  <Route path="/Perfil" element={<Perfil />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </ConsultantProvider>
    </GlobalProvider>
  );
}

export default App;
