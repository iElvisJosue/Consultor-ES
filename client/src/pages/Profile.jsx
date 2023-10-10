import { useGlobal } from "../context/GlobalContext";
import { Toaster } from "sonner";
import ConsultantProfile from "../components/Consultant/ConsultantProfile";
import ClientProfile from "../components/Client/ClientProfile";
import AdminProfile from "../components/AdminProfile";

import "../styles/Profile.css";

export default function Profile() {
  const { user } = useGlobal();

  const profiles = {
    Consultor: <ConsultantProfile user={user} />,
    Cliente: <ClientProfile />,
    Administrador: <AdminProfile />,
  };

  return (
    <main className="Main__Profile">
      {profiles[user.role]}
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
