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
import Cookies from "js-cookie";

export const GlobalContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debería ser usado dentro de GlobalProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
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
  const logout = async (id) => {
    await logoutUser(id);
    return setError();
  };

  return (
    <GlobalContext.Provider
      value={{
        registerEmail,
        checkVerificationCode,
        getUserProfile,
        updateUser,
        login,
        logout,
        user,
        loading,
        isLogin,
        hasCookie,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
