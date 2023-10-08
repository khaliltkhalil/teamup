import React, { useEffect } from "react";
import {
  fetchProjects,
  selectProjects,
  selectProjectsStatus,
} from "../features/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const projectsStatus = useSelector(selectProjectsStatus);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    // only fetch projects when the app start
    if (projectsStatus == "idle") {
      dispatch(fetchProjects());
    }
  }, []);

  let content;

  if (projectsStatus == "loading") {
    content = <h1>Loading....</h1>;
  } else if (projectsStatus == "failed") {
    content = <h1>Something went wrong ... :(</h1>;
  } else if (projectsStatus == "succeeded") {
    content = (
      <div className="flex flex-wrap gap-5 p-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    );
  }

  return <main>{content}</main>;
}

export default Projects;
