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
    <main className="h-screen m-5 flex">
      <section className="flex flex-col gap-3 w-1/2">
        <h1>Members:</h1>
        {content}
      </section>
      {project && project.role === "manager" && (
        <section>
          <h1>Add Members to Project</h1>
          <SearchBar projectId={projectId} />
        </section>
      )}
    </main>
  );
}

export default Members;
