import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Home() {
  const user = useSelector(selectUser);
  return (
    <main className="h-screen">
      <p className="text-3xl text-center m-3">Welcome {user.first_name},</p>
    </main>
  );
}

export default Home;
