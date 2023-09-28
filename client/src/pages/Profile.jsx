import { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { Toaster, toast } from "sonner";
import ConsultantProfile from "../components/Consultant/ConsultantProfile";
import ClientProfile from "../components/Client/ClientProfile";
import AdminProfile from "../components/AdminProfile";
import Cookies from "js-cookie";
import Loader from "../components/Loader";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const { user, logout } = useGlobal();

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
      {loading ? <Loader /> : profiles[user.role]}
      <Toaster richColors position="top-right" />
    </main>
  );
}
