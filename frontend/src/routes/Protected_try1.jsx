import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const Protected = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
