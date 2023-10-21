import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

export default function ProtectedByCookies() {
  const { user } = useGlobal();

  const statusUser = user?.data?.online || user.online;

  if (statusUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/IniciarSesion" replace />;
  }
}
