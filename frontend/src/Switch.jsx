import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// Store pages
import CategoryList from "./pages/CategoryList";
import CategoryProducts from "./pages/CategoryProducts";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Checkout";

// PrivateRoute for verified users
import PrivateRoute from "./routes/PrivateRoute";
// UserPage is controlled by PrivateRoute
import UserPage from "./pages/UserPage";

export default function Switch() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/store" element={<CategoryList />} />
      <Route path="/store/:categoryId" element={<CategoryProducts />} />
      <Route path="/store/all" element={<ProductList />} />
      <Route path="/checkout" element={<Checkout />} />
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
