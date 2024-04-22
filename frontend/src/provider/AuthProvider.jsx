import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// react-jwt - try
import { isExpired, decodeToken } from "react-jwt";

// create empty context-object
const AuthContext = createContext();

// provider for the auth context
export const AuthProvider = ({ children }) => {
  /*
  ===============================================
  Setup 
  ===============================================
  */

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  /*
===============================================
Check Auth
===============================================
*/

  useEffect(() => {
    console.log("useEffect from AuthProvider - Checkauth");
    checkAuthentication();
  }, []);

  //JWT decode for checkAuthentication function
  const verifyToken = (token) => {
    try {
      const decoded = decodeToken(token);
      const decodedExp = isExpired(token);
      return !decodedExp;
    } catch (error) {
      console.error("Misslyckad dekryptering av JWT-token", error);
      return false;
    }
  };

  // check auth and send value to private-route
  const checkAuthentication = async () => {
    // set value
    const token = localStorage.getItem("token");
    let isValidToken = false;
    if (token) {
      // validate token
      isValidToken = verifyToken(token);
      // if valid, return true to isAuth
      setIsAuthenticated(isValidToken);
      // return isAuth value
      return isAuthenticated;
    } else if (!isValidToken) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      return isAuthenticated;
    } else {
      // set value if no token is found
      setIsAuthenticated(false);
      return isAuthenticated;
    }
  };

  /*
===============================================
Login 
===============================================
*/

  // Login Function, called in LoginPage.jsx
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      // if login fails, send correct error message to frontend
      if (!response.ok) {
        const errorMsgText = await response.text();
        const errorMsgJSON = JSON.parse(errorMsgText);
        const errorMsg = errorMsgJSON.message || "Inloggning misslyckad.";
        console.error("Inloggning misslyckad.", errorMsg);
        throw new Error(errorMsg);
      }
      // collect response & define token
      const result = await response.json();
      /* const token = result.token; */
      // auth is true + return token
      setIsAuthenticated(true);
      return result.token;
    } catch (error) {
      console.error("Misslyckad inloggning.", error);
      throw error;
    }
  };

  /*
===============================================
Registration
===============================================
*/
  // Register Function, called in RegisterPage.jsx
  const handleRegistration = async (
    name,
    username,
    password,
    email,
    address,
    city,
    postalCode
  ) => {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
          email,
          address,
          city,
          postalCode,
        }),
      });
      // if registration fails
      if (!response.ok) {
        const errorMsgText = await response.text();
        const errorMsgJSON = JSON.parse(errorMsgText);
        const errorMsg = errorMsgJSON.message || "Registrering misslyckad.";
        console.error("Registrering misslyckad.", errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("Registrering misslyckad.", error);
      throw error;
    }
  };

  /*
===============================================
User Information
===============================================
*/

  // fetch user-info from backend-server
  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/user/customer", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorMsgText = await response.text();
        const errorMsgJSON = JSON.parse(errorMsgText);
        const errorMsg =
          errorMsgJSON.message ||
          "Misslyckad inhämtning av användar information.";
        console.error(
          "Misslyckad inhämtning av användar information.",
          errorMsg
        );
        throw new Error(errorMsg);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Misslyckad inhämtning av användar information.", error);
      throw error;
    }
  };

  /*
===============================================
User Logout
===============================================
*/
  // handle logout from userpage & erase JWT from localstorage
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  /*
===============================================
Provider
===============================================
*/

  // share functions with children

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        checkAuthentication,
        fetchUserInfo,
        handleLogin,
        handleLogout,
        handleRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/*
===============================================
Export 
===============================================
*/

export const useAuth = () => {
  return useContext(AuthContext);
};
