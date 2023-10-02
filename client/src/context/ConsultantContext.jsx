import { createContext, useContext } from "react";
import {
  getConsultantRequest,
  getProjectsAvailableRequest,
  registerDataConsultantRequest,
  registerDataBankRequest,
  addResumeCVRequest,
  addNewExperienceRequest,
  addNewStudyRequest,
  addNewAreaRequest,
  addNewLanguageRequest,
  addNewSkillRequest,
  updateResumeRequest,
  updateExperienceRequest,
  updateEducationRequest,
  updateDataBankRequest,
  deleteExperienceRequest,
  deleteEducationRequest,
  deleteAreaRequest,
  deleteLanguageRequest,
  deleteSkillRequest,
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
      const res = await registerDataConsultantRequest(data);
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
      const res = await getConsultantRequest();
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

  const getProjectsAvailable = async (data) => {
    try {
      const res = await getProjectsAvailableRequest(data);
      if (!res.data) {
        console.log("ERROR GET PROJECTS AVAILABLE");
        // return setError();
      }
      return res;
    } catch (error) {
      console.log(error);
      //   setError();
      console.log("ERROR GET PROJECTS AVAILABLE 2");
      return error;
    }
  };

  const createResumeCV = async (data) => {
    try {
      const res = await addResumeCVRequest(data);
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
  const addExperience = async (data) => {
    try {
      const res = await addNewExperienceRequest(data);
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
      const res = await addNewStudyRequest(data);
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
      const res = await addNewAreaRequest(data);
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
  const addLanguage = async (data) => {
    try {
      const res = await addNewLanguageRequest(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR ADD LANGUAGE");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR ADD LANGUAGE 2");
      return error;
    }
  };
  const addSkill = async (data) => {
    try {
      const res = await addNewSkillRequest(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR ADD SKILL");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR ADD SKILL 2");
      return error;
    }
  };

  const updateResume = async (data) => {
    try {
      const res = await updateResumeRequest(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR UPDATE RESUME");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR UPDATE RESUME 2");
      return error;
    }
  };

  const updateExperience = async (data) => {
    try {
      const res = await updateExperienceRequest(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR UPDATE EXPERIENCE");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR UPDATE EXPERIENCE 2");
      return error;
    }
  };

  const updateEducation = async (data) => {
    try {
      const res = await updateEducationRequest(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR UPDATE EDUCATION");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR UPDATE EDUCATION 2");
      return error;
    }
  };

  const updateDataBank = async (data) => {
    try {
      const res = await updateDataBankRequest(data);
      if (!res.data) {
        // return setError();
        console.log("ERROR UPDATE DATA BANK");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR UPDATE DATA BANK 2");
      return error;
    }
  };

  const deleteExperience = async (id) => {
    try {
      const res = await deleteExperienceRequest(id);
      if (!res.data) {
        // return setError();
        console.log("ERROR DELETE EXPERIENCE");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR DELETE EXPERIENCE 2");
      return error;
    }
  };

  const deleteStudy = async (id) => {
    try {
      const res = await deleteEducationRequest(id);
      if (!res.data) {
        // return setError();
        console.log("ERROR DELETE STUDY");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR DELETE STUDY 2");
      return error;
    }
  };

  const deleteArea = async (id) => {
    try {
      const res = await deleteAreaRequest(id);
      if (!res.data) {
        // return setError();
        console.log("ERROR DELETE AREA");
      }
      console.log(res);
      return res;
    } catch (error) {
      //   setError();
      console.log("ERROR DELETE AREA 2");
      return error;
    }
  };

  const deleteLanguage = async (id) => {
    try {
      const res = await deleteLanguageRequest(id);
      if (!res.data) {
        // return setError();
        console.log("ERROR DELETE LANGUAGE");
      }
      console.log(res);
      return res;
    } catch (error) {
      console.log("ERROR DELETE LANGUAGE 2");
    }
  };
  const deleteSkill = async (id) => {
    try {
      const res = await deleteSkillRequest(id);
      if (!res.data) {
        // return setError();
        console.log("ERROR DELETE SKILL");
      }
      console.log(res);
      return res;
    } catch (error) {
      console.log("ERROR DELETE SKILL 2");
    }
  };

  const registerDataBank = async (data) => {
    try {
      const res = await registerDataBankRequest(data);
      if (!res.data) {
        return console.log("ERROR AL AGREGAR LA INFORMACIÓN DEL BANCO");
      }
      return res;
    } catch (error) {
      console.log("ERROR AL AGREGAR LA INFORMACIÓN DEL BANCO");
    }
  };

  return (
    <ConsultantContext.Provider
      value={{
        getConsultantProfile,
        getProjectsAvailable,
        registerConsultant,
        registerDataBank,
        createResumeCV,
        updateDataBank,
        addExperience,
        addStudy,
        addArea,
        addLanguage,
        addSkill,
        updateResume,
        updateExperience,
        updateEducation,
        deleteExperience,
        deleteStudy,
        deleteArea,
        deleteLanguage,
        deleteSkill,
      }}
    >
      {children}
    </ConsultantContext.Provider>
  );
};
