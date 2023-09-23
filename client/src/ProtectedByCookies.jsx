import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "./context/GlobalContext";

export default function ProtectedRoutes() {
  const { loading, hasCookie } = useGlobal();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !hasCookie) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
