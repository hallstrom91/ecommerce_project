import React, { useState } from "react";
import Switch from "./Switch";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./provider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <>
        <Navigation />
        <Switch />
        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
