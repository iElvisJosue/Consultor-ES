import { createContext, useContext } from "react";
import {
  registerDataClientRequest,
  addNewProjectRequest,
  updateDataClientRequest,
  getInformationClientRequest,
  getConsultantsAvailableForProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
  completedProjectRequest,
  updateDataBusinessClientRequest,
} from "../api/authClient";

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
      const res = await registerDataClientRequest(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR EN EL REGISTRO");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateDataBusinessClient = async (data) => {
    try {
      const res = await updateDataBusinessClientRequest(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR UPDATE DATA BUSINESS CLIENT 1");
      }
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR UPDATE DATA BUSINESS CLIENT 2");
      return error;
    }
  };

  const getInformationClient = async () => {
    try {
      const res = await getInformationClientRequest();
      if (!res.data) {
        return console.log(
          "HUBO UN ERROR AL OBTENER LA INFORMACIÓN DEL CLIENTE"
        );
      }
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const addProject = async (data) => {
    try {
      const res = await addNewProjectRequest(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR AL AGREGAR EL PROYECTO");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateProject = async (data) => {
    try {
      const res = await updateProjectRequest(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR AL EDITAR EL PROYECTO");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await deleteProjectRequest(id);
      if (!res.data) {
        return console.log("HUBO UN ERROR AL ELIMINAR EL PROYECTO");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const completedProject = async (id) => {
    try {
      const res = await completedProjectRequest(id);
      if (!res.data) {
        return console.log("HUBO UN ERROR AL COMPLETAR EL PROYECTO");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateProfileClient = async (data) => {
    try {
      const res = await updateDataClientRequest(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR UPDATE CLIENT 1");
      }
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR UPDATE CLIENT 2");
      return error;
    }
  };

  const getConsultantsAvailableForProject = async (data) => {
    try {
      const res = await getConsultantsAvailableForProjectRequest(data);
      if (!res.data) {
        return console.log(
          "HUBO UN ERROR AL OBTENER LOS CONSULTORES DISPONIBLES"
        );
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ClientContext.Provider
      value={{
        registerClient,
        getInformationClient,
        updateProfileClient,
        getConsultantsAvailableForProject,
        addProject,
        updateProject,
        deleteProject,
        completedProject,
        updateDataBusinessClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
