import { createContext, useContext } from "react";
import { registerDataClient } from "../api/authClient";

export const ClientContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ClientProvider = ({ children }) => {
  const registerClient = async (data) => {
    try {
      const res = await registerDataClient(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR EN EL REGISTRO");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ClientContext.Provider value={{ registerClient }}>
      {children}
    </ClientContext.Provider>
  );
};
