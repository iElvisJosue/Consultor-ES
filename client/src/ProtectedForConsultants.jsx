import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "./context/GlobalContext";

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

  if (role) {
    if (loading) return <h1>Loading...</h1>;
    if (!loading && !isLogin && role === "Consultant") {
      return <Outlet />;
    }
    return <Navigate to="/Login" replace />;
  }
}
