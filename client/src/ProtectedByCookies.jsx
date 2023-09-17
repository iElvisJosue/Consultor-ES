import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function ProtectedRoutes() {
  const { loading, hasCookie } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !hasCookie) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
