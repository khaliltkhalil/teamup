import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMembers,
  selectCurrentProjectId,
  selectMembers,
  selectMembersStatus,
} from "../features/membersSlice";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import { fetchProjects, selectProjectById } from "../features/projectsSlice";

function Members() {
  const { projectId } = useParams();
  console.log(projectId);
  const dispatch = useDispatch();
  const membersStatus = useSelector(selectMembersStatus);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const members = useSelector(selectMembers);
  const project = useSelector((state) => selectProjectById(state, projectId));

  useEffect(() => {
    if (currentProjectId !== projectId) {
      dispatch(fetchMembers(projectId));
    }
    if (currentProjectId !== projectId) {
      dispatch(fetchProjects());
    }
  }, [currentProjectId, dispatch, projectId]);
  let content;
  if (membersStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (membersStatus === "failed") {
    content = <div>Something went wrong</div>;
  } else if (membersStatus === "succeeded") {
    content = members.map((member) => <UserCard key={member.id} {...member} />);
  }
  return (
    <main className="h-screen m-5 flex flex-col gap-5">
      {project && project.role === "manager" && (
        <section className="ml-auto mr-auto">
          <h1>Add Members to Project</h1>
          <SearchBar projectId={projectId} />
        </section>
      )}
      <section className="flex flex-col gap-3">
        <h1>Members:</h1>
        <section className="flex flex-col items-center md:flex-row flex-wrap gap-5">
          {content}
        </section>
      </section>
    </main>
  );
}

export default Members;
