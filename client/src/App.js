import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";

import { Counter } from "./features/counter/Counter";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div data-theme="wireframe">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
