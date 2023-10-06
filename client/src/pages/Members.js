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

function Members() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const membersStatus = useSelector(selectMembersStatus);
  const currentProjectId = useSelector(selectCurrentProjectId);
  const members = useSelector(selectMembers);
  useEffect(() => {
    if (currentProjectId != projectId) {
      dispatch(fetchMembers(projectId));
    }
  }, []);
  let content;
  if (membersStatus == "loading") {
    content = <div>Loading...</div>;
  } else if (membersStatus == "failed") {
    content = <div>Something went wrong</div>;
  } else if (membersStatus == "succeeded") {
    content = members.map((member) => <UserCard key={member.id} {...member} />);
  }
  return (
    <main className="h-screen m-5 flex">
      <section className="flex flex-col gap-3 w-1/2">
        <h1>Members:</h1>
        {content}
      </section>
      <section>
        <SearchBar />
      </section>
    </main>
  );
}

export default Members;
