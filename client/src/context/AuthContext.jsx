import { createContext, useState, useContext, useEffect } from "react";
import {
  sendEmailVerificationCode,
  emailVerification,
  loginUser,
  registerUserUpdate,
  getProfile,
  verifyToken,
  logoutUser,
} from "../api/authGlobal";
import { registerDataClient } from "../api/authClient";
import {
  registerDataConsultant,
  getConsultant,
  addResumeCV,
  updateCV,
  addNewExperience,
  addNewStudy,
  addNewArea,
} from "../api/authConsultant";
import Cookies from "js-cookie";

export const AuthContext = createContext();
// TODO: VERIFICAR SI SE CREA LA COOKIE EN EL NAVEGADOR
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debería ser usado dentro de AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [hasCookie, setHasCookie] = useState(false);
  const [loading, setLoading] = useState(true);

  const setError = () => {
    setUser(null);
    setIsLogin(false);
    setHasCookie(false);
    setLoading(false);
  };

  const setSuccess = (res) => {
    setUser(res);
    setLoading(false);
    setHasCookie(true);
    return res;
  };

  // COMPROBAR SI TIENE UN COOKIE
  useEffect(() => {
    async function checkCookie() {
      const cookies = Cookies.get();
      if (!cookies.accessToken) {
        console.log("NO HAY COOKIE :(");
        setError();
        return;
      }
      try {
        const res = await verifyToken(cookies.accessToken);
        if (!res.data) {
          setError();
          return;
        }
        setSuccess(res.data);
        if (res.data.online) {
          setIsLogin(true);
        }
        return;
      } catch (error) {
        console.log(error);
        setError();
        return;
      }
    }
    checkCookie();
  }, []);

  const registerEmail = async (data) => {
    try {
      const res = await sendEmailVerificationCode(data);
      if (!res.data) {
        return setError();
      }
      Cookies.set("accessToken", res.data.accessToken);
      return setSuccess(res.data.user);
    } catch (error) {
      console.log(error);
      setError();
      return error;
    }
  };

  const getUserProfile = async () => {
    try {
      const res = await getProfile();
      if (!res.data) {
        return setError();
      }
      return setSuccess(res);
    } catch (error) {
      return error;
    }
  };

  const checkVerificationCode = async (codeEntered) => {
    try {
      const res = await emailVerification(codeEntered);
      if (!res.data) {
        return setError();
      }
      return setSuccess(res);
    } catch (error) {
      return error;
    }
  };

  const updateUser = async (data) => {
    try {
      const res = await registerUserUpdate(data);
      return res;
    } catch (error) {
      return error;
    }
  };

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

  const login = async (data) => {
    try {
      const res = await loginUser(data);
      if (!res.data) {
        return setError();
      }
      Cookies.set("accessToken", res.data.accessToken);
      return setSuccess(res.data.user);
    } catch (error) {
      setError();
      return error;
    }
  };

  const getConsultantProfile = async () => {
    try {
      const res = await getConsultant();
      if (!res.data) {
        return setError();
      }
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const createResumeCV = async (data) => {
    try {
      const res = await addResumeCV(data);
      if (!res.data) {
        return setError();
      }
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const updateStatusCV = async () => {
    try {
      const res = await updateCV();
      if (!res.data) {
        return setError();
      }
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const addExperience = async (data) => {
    try {
      const res = await addNewExperience(data);
      if (!res.data) {
        return setError();
      }
      console.log(res);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const addStudy = async (data) => {
    try {
      const res = await addNewStudy(data);
      if (!res.data) {
        return setError();
      }
      console.log(res);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };
  const addArea = async (data) => {
    try {
      const res = await addNewArea(data);
      if (!res.data) {
        return setError();
      }
      console.log(res);
      return res;
    } catch (error) {
      setError();
      return error;
    }
  };

  const logout = async (id) => {
    await logoutUser(id);
    return setError();
  };

  return (
    <AuthContext.Provider
      value={{
        registerEmail,
        checkVerificationCode,
        getUserProfile,
        registerConsultant,
        updateUser,
        registerClient,
        getConsultantProfile,
        login,
        createResumeCV,
        updateStatusCV,
        addExperience,
        addStudy,
        addArea,
        logout,
        user,
        loading,
        isLogin,
        hasCookie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
