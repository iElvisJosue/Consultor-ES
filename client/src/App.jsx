import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import EmailVerification from "./pages/EmailVerification";
import CodeVerification from "./pages/CodeVerification";
import ConsultantRegisterData from "./pages/ConsultantRegisterData";
import Profile from "./pages/Profile";
import ClientRegisterData from "./pages/ClientRegisterData";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/ConsultantEmailVerification"
            element={<EmailVerification title="Consultor" role="Consultant" />}
          />
          <Route
            path="/ClientEmailVerification"
            element={<EmailVerification title="Cliente" role="Client" />}
          />

          <Route element={<ProtectedRoutes />}>
            <Route
              path="/ConsultantCodeVerification"
              element={<CodeVerification role="Consultant" />}
            />
            <Route
              path="/ClientCodeVerification"
              element={<CodeVerification role="Client" />}
            />
            <Route
              path="/ConsultantRegisterData"
              element={<ConsultantRegisterData />}
            />
            <Route
              path="/ClientRegisterData"
              element={<ClientRegisterData />}
            />
            <Route path="/Profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
