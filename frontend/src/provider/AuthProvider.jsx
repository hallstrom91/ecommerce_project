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

  // check auth
  useEffect(() => {
    checkAuthentication();
  }, []);

  //JWT decode for checkAuthentication function
  const verifyToken = (token) => {
    try {
      const decoded = decodeToken(token);
      const decodedExp = isExpired(token);
      return !decodedExp;
    } catch (error) {
      // add logger
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
      const response = await fetch("/user/login", {
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
        // add logger
        throw new Error(errorMsg);
      }
      // collect response & define token
      const result = await response.json();
      setIsAuthenticated(true);
      return result.token;
    } catch (error) {
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
      const response = await fetch("/user/register", {
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
        // add logger
        throw new Error(errorMsg);
      }
    } catch (error) {
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
      const response = await fetch("/user/customer", {
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
        // add logger
        throw new Error(errorMsg);
      }
      const result = await response.json();
      return result;
    } catch (error) {
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
