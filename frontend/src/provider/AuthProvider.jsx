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
      console.error("Error decoding JWT-token", error);
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

  // Check auth of user, old
  /*   const checkAuthentication = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // set value
      setIsAuthenticated(true);
      // return value
      return isAuthenticated;
    } else {
      // set value
      setIsAuthenticated(false);
      return isAuthenticated;
    }
  }; */

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
        const errorMsg = errorMsgJSON.message || "Failed to register user.";
        console.error("failed to register.", errorMsg);
        throw new Error(errorMsg);
      }
      // collect response & define token
      const result = await response.json();
      console.log("Login Successfull.");
      /* const token = result.token; */
      // auth is true + return token
      setIsAuthenticated(true);
      return result.token;
    } catch (error) {
      console.error("Failed to login.", error);
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
        const errorMsg = errorMsgJSON.message || "Failed to register user.";
        console.error("failed to register.", errorMsg);
        throw new Error(errorMsg);
      }
      //consolelog success
      console.log("User Registration Successfull.");
    } catch (error) {
      console.error("Failed to register user", error);
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
          errorMsgJSON.message || "Failed to fetch user information.";
        console.error("Failed to fetch user information.", errorMsg);
        throw new Error(errorMsg);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to fetch user information.", error);
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
