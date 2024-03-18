import React, { useState } from "react";
import Switch from "./Switch";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navigation />
      <Switch />
      <Footer />
    </>
  );
}

export default App;
