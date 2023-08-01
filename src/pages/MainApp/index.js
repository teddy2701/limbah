import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "../../component";
import Home from "../home";
import DaftarAkun from "../daftar-akun";
import DaftarNode from "../daftar-node";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainApp = () => {
  const navigate = useNavigate();

  // ambil data pada reducer login
  const isAuthenticated = useSelector((state) => state.loginReducer);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!isAuthenticated.loggedIn) {
      navigate("/login");
    } else {
      setRole(isAuthenticated.userData.hakAkses);
    }
  });

  return (
    <div className="pb-5">
      <Header role={role} />
      <Routes>
        <Route path="/daftar-akun" element={<DaftarAkun />} />
        <Route path="/daftar-node" element={<DaftarNode />} />
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
};

export default MainApp;
