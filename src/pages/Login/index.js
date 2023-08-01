import React, { useState } from "react";
import "./login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Input } from "../../component";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../config/redux/action/loginAction";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const klikLogin = () => {
    axios
      .post("https://aggressive-puce-dog.cyclic.cloud/v1/auth/login", {
        username,
        password,
      })
      .then((respon) => {
        const dataUser = {
          username: respon.data.data.username,
          hakAkses: respon.data.data.hakAkses,
          node: respon.data.data.node,
        };

        dispatch(login(dataUser));
        const { from } = location.state || { from: "/" };
        navigate(from);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  return (
    <div className="body-halaman text-white min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full body-login rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-6xl sm:text-4xl text-center">
              Login
            </h1>
            <div className="space-y-4 md:space-y-6">
              <Input
                title="Username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                title="Passoword"
                placeholder="******"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {error && (
                <p className="text-red-500 font-bold text-center">{error}</p>
              )}
              <div className="flex justify-center">
                <Button
                  title="Masuk"
                  onClick={klikLogin}
                  className="w-full sm:w-2/3 text-white border-4 border-cyan-600 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 text-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
