import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProjectById } from "../features/projectsSlice";

function SingleProject() {
  const { projectId } = useParams();
  const project = useSelector((state) => selectProjectById(state, projectId));
  return (
    <main className="h-screen m-5">
      <section id="project-info" className="flex flex-col w-1/2 gap-5 m-auto">
        <p className="card-title">{project.title}</p>
        <p>{project.description}</p>
        <p>Deadline: {new Date(project.deadline).toDateString()}</p>
        <p>Status: {project.status}</p>
        {project.role == "manager" && (
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Edit Project</button>
          </div>
        )}
      </section>
      <section></section>
    </main>
  );
}

export default SingleProject;
