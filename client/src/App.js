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
    if (!user.id) {
      navigate("/signin");
    }
  }, [userStatus]);

  if (userStatus != "succeeded") {
    return <h1>Loading.....</h1>;
  }

  return (
    <div data-theme="cupcake">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
