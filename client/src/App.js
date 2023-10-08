import React, { useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectUserStatus } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus == "idle" || userStatus == "failed") {
      navigate("/signin");
    }
  }, [userStatus]);

  if (userStatus != "succeeded") {
    return <h1>Loading.....</h1>;
  }

  return (
    <div data-theme="cupcake" className="bg-white">
      <Navbar />
    </div>
  );
}

export default App;
