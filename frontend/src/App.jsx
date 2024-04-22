import React, { useState } from "react";
import Switch from "@src/Switch";
import Footer from "@shared/Footer";
import Navigation from "@shared/Navigation";
import "@src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
/* import "bootstrap/scss/bootstrap.scss"; */
import { AuthProvider } from "@provider/AuthProvider";
import { CartState } from "@provider/CartProvider";

function App() {
  return (
    <AuthProvider>
      <CartState>
        <>
          <Navigation />
          <Switch />
          <Footer />
        </>
      </CartState>
    </AuthProvider>
  );
}

export default App;
