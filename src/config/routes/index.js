import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, MainApp, Hal404 } from "../../pages";

const Halaman = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<MainApp />} />
      </Routes>
    </Router>
  );
};

export default Halaman;
