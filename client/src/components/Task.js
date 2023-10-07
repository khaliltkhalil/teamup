import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { editTask } from "../features/tasksSlice";
import { AiFillDelete } from "react-icons/ai";

function Task({ id, title, user, status, currentUser }) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const dispatch = useDispatch();
  const onOptionChange = (e) => {
    dispatch(
      editTask({
        id,
        status: e.target.value,
      })
    );
    setSelectedStatus(e.target.value);
  };
  return (
    <div className="card w-3/4 flex flex-row gap-4 bg-base-200 shadow-xl p-5">
      <section className="w-1/4">
        <h2>{title}</h2>
      </section>
      <UserCard {...user} />
      <section className="w-1/4">
        <h2>status:</h2>
        <form>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <label htmlFor={`pending-${id}`}>Pending</label>
              <input
                disabled={currentUser.id === user.id ? false : true}
                type="radio"
                id={`pending-${id}`}
                name="status"
                value="pending"
                className="radio radio-primary"
                checked={selectedStatus === "pending"}
                onChange={onOptionChange}
              />
            </div>
            <div className="flex flex-row gap-2">
              <label htmlFor={`ongoing-${id}`}> Ongoing</label>
              <input
                disabled={currentUser.id === user.id ? false : true}
                type="radio"
                id={`ongoing-${id}`}
                name="status"
                value="ongoing"
                className="radio radio-primary"
                checked={selectedStatus === "ongoing"}
                onChange={onOptionChange}
              />
            </div>
            <div className="flex flex-row gap-2">
              <label htmlFor={`completed-${id}`}>Completed</label>
              <input
                disabled={currentUser.id === user.id ? false : true}
                type="radio"
                name="status"
                id={`completed-${id}`}
                value="completed"
                className="radio radio-primary"
                checked={selectedStatus === "completed"}
                onChange={onOptionChange}
              />
            </div>
          </div>
        </form>
      </section>
      <section className="flex w-1/4 justify-end ">
        <AiFillDelete size={30} />
      </section>
    </div>
  );
}

export default Task;
