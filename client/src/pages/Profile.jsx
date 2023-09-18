import { useEffect, useState, useRef } from "react";
import ConsultantProfile from "../components/ConsultantProfile";
import ClientProfile from "../components/ClientProfile";
import AdminProfile from "../components/AdminProfile";
import { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const { getUserProfile, logout } = useAuth();

  const userProfile = useRef(null);

  const profiles = {
    Consultant: <ConsultantProfile />,
    Client: <ClientProfile />,
    Admin: <AdminProfile />,
  };

  useEffect(() => {
    async function checkUserProfile() {
      try {
        const res = await getUserProfile();
        setLoading(false);
        userProfile.current = res.data.role;
        toast.success("¡Bienvenido!");
      } catch (error) {
        toast.error(
          "¡Oops! Ha ocurrido un error. No es tu culpa. Por favor inténtalo nuevamente."
        );
        setLoading(false);
      }
    }
    checkUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closingSession = () => {
    const promise = new Promise(() => {
      setTimeout(() => {
        Cookies.remove("accessToken");
        logout();
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
      {loading ? (
        <h1>Cargando...Normalmente esto no tarda más de un minuto</h1>
      ) : (
        profiles[userProfile.current]
      )}
      <Toaster richColors position="top-right" />
    </main>
  );
}
