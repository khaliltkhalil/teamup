import React, { useEffect } from "react";
import {
  fetchProjects,
  selectProjects,
  selectProjectsStatus,
} from "../features/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";

function Projects() {
  const projectsStatus = useSelector(selectProjectsStatus);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectsStatus == "idle") {
      dispatch(fetchProjects());
    }
  }, []);

  let content;
  console.log(projectsStatus);

  if (projectsStatus == "loading") {
    content = <h1>Loading....</h1>;
  } else if (projectsStatus == "failed") {
    content = <h1>Something went wrong ... :(</h1>;
  } else if (projectsStatus == "succeeded") {
    console.log(projects);
    content = <div>Projects</div>;
  }

  return <main className="h-screen">{content}</main>;
}

export default Projects;
