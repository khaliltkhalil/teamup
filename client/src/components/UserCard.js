import React from "react";
import user_img from "../resources/user-img.png";

function UserCard({ id, first_name, last_name, email, role }) {
  return (
    <div className="flex  gap-2  p-2 sm:w-72 w-3/4  shadow-xl">
      <div className="h-20 avatar">
        <div className="w-20 rounded-full">
          <img alt="user" src={user_img} />
        </div>
      </div>
      <div>
        <h2>
          {first_name} {last_name}
        </h2>
        <p>{email}</p>
        <p>{role}</p>
      </div>
    </div>
  );
}

export default UserCard;
