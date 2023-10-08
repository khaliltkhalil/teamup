import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProjects,
  selectProjectById,
  selectProjectsStatus,
} from "../features/projectsSlice";
import AddTaskBar from "../components/AddTaskBar";
import {
  selectCurrentProjectId,
  selectMembers,
  fetchMembers,
} from "../features/membersSlice";
import TasksBar from "../components/TasksBar";

function SingleProject() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => selectProjectById(state, projectId));
  const projectsStatus = useSelector(selectProjectsStatus);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const members = useSelector(selectMembers);

  useEffect(() => {
    if (projectsStatus == "idle") {
      dispatch(fetchProjects());
    }
    if (currentProjectId != projectId) {
      dispatch(fetchMembers(projectId));
    }
  }, []);

  if (projectsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (projectsStatus === "failed") {
    return <div>Something went wrong try again later</div>;
  }

  if (projectsStatus === "succeeded") {
    return (
      <main className="flex flex-col gap-12 m-5">
        <section
          id="project-info"
          className="flex flex-col w-1/2 gap-5 ml-auto mr-auto"
        >
          <p className="card-title">{project.title}</p>
          <p>{project.description}</p>
          <p>Deadline: {new Date(project.deadline).toDateString()}</p>
          <p>Status: {project.status}</p>
          {/* {project.role == "manager" && (
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Edit Project</button>
            </div>
          )} */}
        </section>
        {project.role === "manager" && (
          <section>
            <h2>Add Task</h2>
            <AddTaskBar members={members} projectId={projectId} />
          </section>
        )}
        <TasksBar projectId={projectId} projectRole={project.role} />
      </main>
    );
  }
}

export default SingleProject;
