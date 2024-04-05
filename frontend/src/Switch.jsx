import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Home from "@pages/Home";
import Login from "@pages/Login";
import Register from "@pages/Register";
// Store pages
import Categories from "@pages/Categories";
import SubCategory from "@pages/SubCategory";
import Products from "@pages/Products";
import Cart from "@pages/Cart";
import SearchResults from "@pages/SearchResults";

// PrivateRoute for verified users
import PrivateRoute from "@routes/PrivateRoute";
// UserPage is controlled by PrivateRoute
import UserInterface from "@pages/UserInterface";

export default function Switch() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/store" element={<Categories />} />
      <Route path="/store/:categoryId" element={<SubCategory />} />
      <Route path="/store/all" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search-results/:idOrName" element={<SearchResults />} />
      <Route
        exact
        path="/private-route"
        element={
          <PrivateRoute>
            <UserInterface />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
