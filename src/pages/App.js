import React from "react";
import "./App.css";
import Halaman from "../config/routes";
import store from "../config/redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Halaman />
    </Provider>
  );
};

export default App;
