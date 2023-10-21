import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Loader from "../components/webapp/global/Loader";

export default function ProtectedForClients() {
  const { loading, getUserProfile, isLogin } = useGlobal();
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function checkUserProfile() {
      try {
        const res = await getUserProfile();
        setRole(res.data.role);
      } catch (error) {
        console.log(error);
      }
    }
    checkUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: COMPROBAR QUE EL USUARIO TENGA EL CORREO VERIFICADO
  if (role) {
    if (loading) return <Loader />;
    if (!loading && !isLogin && role === "Consultor") {
      return <Outlet />;
    }
    return <Navigate to="/IniciarSesion" replace />;
  }
}
