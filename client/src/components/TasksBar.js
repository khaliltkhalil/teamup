import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  selectCurrentProjectId,
  selectTasks,
  selectTasksStatus,
} from "../features/tasksSlice";
import Task from "./Task";
import { selectUser } from "../features/userSlice";

function TasksBar({ projectId }) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const tasksStatus = useSelector(selectTasksStatus);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const currentUser = useSelector(selectUser);
  useEffect(() => {
    if (currentProjectId !== projectId) {
      dispatch(fetchTasks(projectId));
    }
  }, []);
  let content;
  if (tasksStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (tasksStatus === "failed") {
    content = <div>Something went wrong</div>;
  } else if (tasksStatus === "succeeded") {
    content = tasks.map((task) => (
      <Task key={task.id} {...task} currentUser={currentUser} />
    ));
  }
  return (
    <div className="flex flex-col gap-3">
      <section>Filter</section>
      <h1>Tasks</h1>
      <section className="flex flex-col gap-5">{content}</section>
    </div>
  );
}

export default TasksBar;
