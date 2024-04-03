import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "@provider/AuthProvider";
import LoadingScreen from "@shared/LoadingScreen";

// validate user, if not, send to "/login" instead of "/private-route"
export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      // simulate delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // turn off loading screen component
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  // show loadingscreen while auth control
  if (loading) {
    return <LoadingScreen />;
  }
  return isAuthenticated ? (
    // if user is authenticated, render child props
    children
  ) : (
    // if user is NOT authenticated, send to start/login-page.
    <Navigate to="/login" replace />
  );
}
