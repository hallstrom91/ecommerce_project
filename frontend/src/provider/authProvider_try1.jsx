import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //useState to hold auth token
  const [token, setToken] = useState(localStorage.getItem("token"));

  // function to set new auth token
  const assignToken = (newToken) => {
    setToken(newToken);
  };

  useEffect(() => {
    if (token) {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      // save token i localStorage
      localStorage.setItem("token", token);
      // save headers in localstorage for option to reset
      localStorage.setItem("headers", JSON.stringify([...headers.entries()]));
    } else {
      // remove token
      const headers = new Headers();
      headers.delete("Authorization");
      localStorage.removeItem("token");
    }
  }, [token]);

  // remember value of auth context by useMemo
  const contextValue = useMemo(() => ({ token, assignToken }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
