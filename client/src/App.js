import React, { useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserStatus } from "./features/userSlice";

function App() {
  const userStatus = useSelector(selectUserStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus === "idle" || userStatus === "failed") {
      navigate("/signin");
    }
  }, [navigate, userStatus]);

  if (userStatus !== "succeeded") {
    return <h1>Loading.....</h1>;
  }

  return (
    <div data-theme="cupcake" className="bg-white">
      <Navbar />
    </div>
  );
}

export default App;
