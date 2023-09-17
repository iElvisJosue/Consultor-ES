import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function ProtectedForClients() {
  const { loading, getUserProfile } = useAuth();
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

  if (role) {
    if (loading) return <h1>Loading...</h1>;
    if (!loading && role === "Client") {
      return <Outlet />;
    }
    return <Navigate to="/Login" replace />;
  }
}
