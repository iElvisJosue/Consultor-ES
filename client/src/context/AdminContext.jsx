import { createContext, useContext } from "react";
import { getUsersAndProjectsRequest } from "../api/authAdmin";

export const AdminContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within a AdminPro");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AdminProvider = ({ children }) => {
  const getUsersAndProjects = async () => {
    try {
      const res = await getUsersAndProjectsRequest();
      if (!res.data) {
        return console.log("HUBO UN ERROR AL OBTENER LOS USUARIOS");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        getUsersAndProjects,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
