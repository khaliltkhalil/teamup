import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

function Task({ id, title, user, status, currentUser }) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  return (
    <div className="card w-3/4 flex flex-row gap-4 bg-base-200 shadow-xl p-5">
      <section className="w-1/4">
        <h2>{title}</h2>
      </section>
      <UserCard {...user} />
      <section>
        <h2>status:</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <label>Pending</label>
            <input
              type="radio"
              name="radio-2"
              className="radio radio-primary"
              checked
            />
          </div>
          <div className="flex flex-row gap-2">
            <label>Ongoing</label>
            <input
              type="radio"
              name="radio-2"
              className="radio radio-primary"
            />
          </div>
          <div className="flex flex-row gap-2">
            <label>Completed</label>
            <input
              type="radio"
              name="radio-2"
              className="radio radio-primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Task;
