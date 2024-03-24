import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// create empty context-object for sharing auth state & functions
const AuthContext = createContext();

// provider for the auth context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  /* Login Function states. shared in all other also */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* Register Function states */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  /*  User Information Request Function states */
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    console.log("useEffect from AuthProvider - Checkauth");
    checkAuthentication();
  }, []);

  // Check auth of user, if no JWT - se
  const checkAuthentication = async () => {
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
  };

  // Login Function, called in LoginPage.jsx
  const handleLogin = async () => {
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
      // collect response
      const result = await response.json();
      // if login fails
      if (!response.ok) {
        const errorMsgText = await response.text();
        const errorMsgJSON = JSON.parse(errorMsgText);
        const errorMsg = errorMsgJSON || "Failed to login.";
        console.error("Failed to login.", errorMsg);
        throw new Error(errorMsg);
      }
      // clear all input-fields at success
      setUsername("");
      setPassword("");
      console.log("Login Successfull.");
      // define token
      const token = result.token;
      // Set token to localStorage
      localStorage.setItem("token", token);
      console.log("login-token", token);
      // navigate to userpage
      setIsAuthenticated(true);
      navigate("/private-route");
    } catch (error) {
      setError(error.message);
      console.error("Failed to login.", error);
    }
  };

  // Register Function, called in RegisterPage.jsx

  const handleRegistration = async () => {
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
      // clear all input-fields at success
      setName("");
      setUsername("");
      setPassword("");
      setEmail("");
      setAddress("");
      setCity("");
      setPostalCode("");
      // success message
      setSuccessMsg("Registration Successfull. Please Login.");
      //continue all values
      console.log("User Registration Successfull.");
    } catch (error) {
      throw new Error("Failed to register user", error);
      setError(error.message);
      console.error("Failed to register user", error);
    }
  };

  // fetch user-info from backend-server
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/user/customer", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user information.");
      }
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // handle logout from userpage & erase JWT from localstorage
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleRegistration,
        handleLogout,
        fetchUserInfo,
        isAuthenticated,
        checkAuthentication,
        username,
        setUsername,
        password,
        setPassword,
        error,
        setError,
        name,
        setName,
        email,
        setEmail,
        address,
        setAddress,
        city,
        setCity,
        postalCode,
        setPostalCode,
        successMsg,
        setSuccessMsg,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

/* export const checkAuthentication = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
 */
