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
import { registerDataConsultant } from "../api/authConsultant";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCookie, setHasCookie] = useState(false);
  const [loading, setLoading] = useState(true);

  const setError = () => {
    setUser(null);
    setIsAuthenticated(false);
    setHasCookie(false);
    setLoading(false);
  };

  const setSuccess = (res) => {
    // const { _id, email, emailVerified, role } = res.data;
    // setUser({ id: _id, email, emailVerified, role });
    const { _id } = res.data;
    setUser(_id);
    setHasCookie(true);
    setIsAuthenticated(true);
    setLoading(false);
    return res;
  };

  //COMPROBAR SI TIENE UN COOKIE
  useEffect(() => {
    async function checkCookie() {
      const cookies = Cookies.get();
      if (!cookies.accessToken) {
        console.log("NO HAY COOKIE");
        setError();
        return;
      }
      try {
        const res = await verifyToken(cookies.accessToken);
        if (!res.data) {
          setError();
          return;
        }
        return setSuccess(res);
      } catch (error) {
        console.log(error);
        setError();
        return;
      }
    }
    checkCookie();
  }, []);

  const registerConsultantEmail = async (data) => {
    try {
      const res = await sendEmailVerificationCode(data);
      if (!res.data) {
        return setError();
      }
      return setSuccess(res);
    } catch (error) {
      setError();
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
      console.log(res);
      Cookies.set("accessToken");
      return setSuccess(res);
    } catch (error) {
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
      setError();
      return error;
    }
  };

  const logout = () => {
    logoutUser();
    setError();
  };

  return (
    <AuthContext.Provider
      value={{
        registerConsultantEmail,
        checkVerificationCode,
        registerConsultant,
        updateUser,
        login,
        getUserProfile,
        registerClient,
        logout,
        user,
        loading,
        isAuthenticated,
        hasCookie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
