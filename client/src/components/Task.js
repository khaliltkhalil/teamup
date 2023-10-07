import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";

function Task({ id, title, user, status, currentUser }) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const dispatch = useDispatch();
  const onOptionChange = (e) => {};
  return (
    <div className="card w-3/4 flex flex-row gap-4 bg-base-200 shadow-xl p-5">
      <section className="w-1/4">
        <h2>{title}</h2>
      </section>
      <UserCard {...user} />
      <section>
        <h2>status:</h2>
        <form>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <label htmlFor={`pending-${id}`}>Pending</label>
              <input
                type="radio"
                id={`pending-${id}`}
                name="pending"
                className="radio radio-primary"
                checked={selectedStatus === "pending"}
                onChange={onOptionChange}
              />
            </div>
            <div className="flex flex-row gap-2">
              <label htmlFor={`ongoing-${id}`}> Ongoing</label>
              <input
                type="radio"
                id={`ongoing-${id}`}
                name="ongoing"
                className="radio radio-primary"
                checked={selectedStatus === "ongoing"}
                onChange={onOptionChange}
              />
            </div>
            <div className="flex flex-row gap-2">
              <label htmlFor={`completed-${id}`}>Completed</label>
              <input
                type="radio"
                name="completed"
                id={`completed-${id}`}
                className="radio radio-primary"
                checked={selectedStatus === "completed"}
                onChange={onOptionChange}
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Task;
