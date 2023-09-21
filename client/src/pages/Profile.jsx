import { useEffect, useState } from "react";
import ConsultantProfile from "../components/ConsultantProfile";
import ClientProfile from "../components/ClientProfile";
import AdminProfile from "../components/AdminProfile";
import { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  const profiles = {
    Consultant: <ConsultantProfile user={user} />,
    Client: <ClientProfile />,
    Admin: <AdminProfile />,
  };

  useEffect(() => {
    if (user.role != "") {
      setLoading(false);
      return;
    }
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closingSession = () => {
    const promise = new Promise(() => {
      setTimeout(() => {
        logout({ id: user._id });
        Cookies.remove("accessToken");
        return;
      }, 1500);
    });

    toast.promise(promise, {
      loading: "Cerrando sesión...",
    });
  };

  return (
    <main className="Main">
      <header className="Header">
        <button onClick={closingSession}>Cerrar sesión</button>
      </header>
      <br />
      {loading ? (
        <h1>Cargando...Normalmente esto no tarda más de un minuto</h1>
      ) : (
        profiles[user.role]
      )}
      <Toaster richColors position="top-right" />
    </main>
  );
}
