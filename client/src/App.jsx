import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { ConsultantProvider } from "./context/ConsultantContext";
import { ClientProvider } from "./context/ClientContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import WhyConsultant from "./pages/WhyConsultant";
import ProtectedByCookies from "./protection/ProtectedByCookies";
import ProtectedForClients from "./protection/ProtectedForClients";
import ProtectedForConsultants from "./protection/ProtectedForConsultants";
import EmailVerification from "./pages/EmailVerification";
import CodeVerification from "./pages/CodeVerification";
import Profile from "./pages/Profile";
import RegisterData from "./pages/RegisterData";

export default function App() {
  return (
    <GlobalProvider>
      <ConsultantProvider>
        <ClientProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/IniciarSesion" element={<Login />} />
              <Route path="/QuienesSomos" element={<About />} />
              <Route path="/ParaQueUnConsultor" element={<WhyConsultant />} />
              <Route
                path="/ConsultorVerificacionDeCorreo"
                element={<EmailVerification role="Consultor" />}
              />
              <Route
                path="/ClienteVerificacionDeCorreo"
                element={<EmailVerification role="Cliente" />}
              />

              <Route element={<ProtectedByCookies />}>
                <Route element={<ProtectedForConsultants />}>
                  <Route
                    path="/ConsultorCodigoDeVerificacion"
                    element={<CodeVerification role="Consultor" />}
                  />
                  <Route
                    path="/ConsultorRegistroDeDatos"
                    element={<RegisterData role="Consultor" />}
                  />
                </Route>
                <Route element={<ProtectedForClients />}>
                  <Route
                    path="/ClienteCodigoDeVerificacion"
                    element={<CodeVerification role="Cliente" />}
                  />
                  <Route
                    path="/ClienteRegistroDeDatos"
                    element={<RegisterData role="Cliente" />}
                  />
                </Route>
                <Route path="/Perfil" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </ConsultantProvider>
    </GlobalProvider>
  );
}
