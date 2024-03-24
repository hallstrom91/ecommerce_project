import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// UserPage is controlled by PrivateRoute
import UserPage from "./pages/UserPage";
// PrivateRoute for verified users
import PrivateRoute from "./routes/PrivateRoute";

export default function Switch() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/store" element={<Store />} />
      <Route path="/about" element={<About />} />
      <Route
        exact
        path="/private-route"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
