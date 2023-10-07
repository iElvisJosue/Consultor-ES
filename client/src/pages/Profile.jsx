import { useGlobal } from "../context/GlobalContext";
import { Toaster } from "sonner";
import ConsultantProfile from "../components/Consultant/ConsultantProfile";
import ClientProfile from "../components/Client/ClientProfile";
import AdminProfile from "../components/AdminProfile";

import "../styles/Profile.css";

export default function Profile() {
  const { user } = useGlobal();

  const profiles = {
    Consultant: <ConsultantProfile user={user} />,
    Client: <ClientProfile />,
    Admin: <AdminProfile />,
  };

  return (
    <main className="Main__Profile">
      {/* <header className="Header">
          <button onClick={closingSession}>Cerrar sesión</button>
        </header> */}
      {profiles[user.role]}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
