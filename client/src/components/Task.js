import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../features/tasksSlice";

function Task({ id, title, user, status, currentUser, projectRole }) {
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

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };
  return (
    <div className="card  w-80 bg-base-100 shadow-xl">
      <div className="card-body p-3.5">
        <h2 className="card-title">{title}</h2>
        <div className="">
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <p>{user.email}</p>
        </div>
        <section className="w-1/4">
          <h2>Status:</h2>
          <form>
            <div className="flex flex-row gap-2 text-sm">
              <div className="flex flex-row gap-2">
                <label className="cursor-pointer " htmlFor={`pending-${id}`}>
                  Pending
                </label>
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
                <label className="cursor-pointer " htmlFor={`ongoing-${id}`}>
                  {" "}
                  Ongoing
                </label>
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
                <label className="cursor-pointer " htmlFor={`completed-${id}`}>
                  Completed
                </label>
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
        <div className="card-actions  justify-end pt-3">
          {projectRole === "manager" && (
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
