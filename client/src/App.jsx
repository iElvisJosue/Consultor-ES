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
import ConsultantRegisterData from "./pages/ConsultantRegisterData";
import Profile from "./pages/Profile";
import ClientRegisterData from "./pages/ClientRegisterData";

export default function App() {
  return (
    <GlobalProvider>
      <ConsultantProvider>
        <ClientProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/WhyConsultant" element={<WhyConsultant />} />
              <Route
                path="/ConsultantEmailVerification"
                element={
                  <EmailVerification title="Consultor" role="Consultant" />
                }
              />
              <Route
                path="/ClientEmailVerification"
                element={<EmailVerification title="Cliente" role="Client" />}
              />

              <Route element={<ProtectedByCookies />}>
                <Route element={<ProtectedForConsultants />}>
                  <Route
                    path="/ConsultantCodeVerification"
                    element={<CodeVerification role="Consultant" />}
                  />
                  <Route
                    path="/ConsultantRegisterData"
                    element={<ConsultantRegisterData />}
                  />
                </Route>
                <Route element={<ProtectedForClients />}>
                  <Route
                    path="/ClientCodeVerification"
                    element={<CodeVerification role="Client" />}
                  />
                  <Route
                    path="/ClientRegisterData"
                    element={<ClientRegisterData />}
                  />
                </Route>
                <Route path="/Profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </ConsultantProvider>
    </GlobalProvider>
  );
}
