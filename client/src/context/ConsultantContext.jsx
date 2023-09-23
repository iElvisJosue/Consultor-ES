import { createContext, useContext } from "react";
import {
  registerDataConsultant,
  getConsultant,
  addResumeCV,
  updateCV,
  addNewExperience,
  addNewStudy,
  addNewArea,
} from "../api/authConsultant";

export const ConsultantContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useConsultant = () => {
  const context = useContext(ConsultantContext);
  if (!context) {
    throw new Error(
      "useConsultant debería ser usado dentro de ConsultantProvider"
    );
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ConsultantProvider = ({ children }) => {
  const registerConsultant = async (data) => {
    try {
      const res = await registerDataConsultant(data);
      if (!res.data) {
        return console.log("HUBO UN ERROR EN EL REGISTRO");
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  const getConsultantProfile = async () => {
    try {
      const res = await getConsultant();
      if (!res.data) {
        console.log("ERROR GET CONSULTANT");
        // return setError();
      }
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR GET CONSULTANT 2");
      return error;
    }
  };

  const createResumeCV = async (data) => {
    try {
      const res = await addResumeCV(data);
      if (!res.data) {
        return console.log("ERROR CREATE RESUME CV");
        // return setError();
      }
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR CREATE RESUME CV 2");
      return error;
    }
  };

  const updateStatusCV = async () => {
    try {
      const res = await updateCV();
      if (!res.data) {
        console.log("ERROR UPDATE STATUS CV");
        // return setError();
      }
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR UPDATE STATUS CV 2");
      return error;
    }
  };
  const addExperience = async (data) => {
    try {
      const res = await addNewExperience(data);
      if (!res.data) {
        console.log("ERROR ADD EXPERIENCE");
        // return setError();
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR ADD EXPERIENCE 2");
      return error;
    }
  };

  const addStudy = async (data) => {
    try {
      const res = await addNewStudy(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR ADD STUDY");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR ADD STUDY 2");
      return error;
    }
  };
  const addArea = async (data) => {
    try {
      const res = await addNewArea(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR ADD AREA");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR ADD AREA 2");
      return error;
    }
  };

  return (
    <ConsultantContext.Provider
      value={{
        registerConsultant,
        getConsultantProfile,
        createResumeCV,
        updateStatusCV,
        addExperience,
        addStudy,
        addArea,
      }}
    >
      {children}
    </ConsultantContext.Provider>
  );
};
