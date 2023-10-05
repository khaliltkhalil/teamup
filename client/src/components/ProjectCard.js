import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({ id, title, description, deadline }) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p>Due Date: {new Date(deadline).toDateString()}</p>
        <div className="card-actions justify-end">
          <button onClick={handleButtonClick} className="btn btn-primary">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
