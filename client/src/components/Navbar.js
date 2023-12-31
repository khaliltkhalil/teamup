import React from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  Link,
  useLocation,
  NavLink,
  matchPath,
  useParams,
} from "react-router-dom";
import { logoutUser } from "../features/userSlice";
import { clearProjectState } from "../features/projectsSlice";
import { clearTasksState } from "../features/tasksSlice";
import { clearMembersState } from "../features/membersSlice";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { projectId } = useParams();
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearProjectState());
    dispatch(clearTasksState());
    dispatch(clearMembersState());
  };

  const homePageLinks = (
    <>
      <li>
        <Link to="/projects">Projects</Link>
      </li>
    </>
  );

  const projectsPageLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <Link to="/projects/addProject">Add Project</Link>
      </li>
    </>
  );

  const singleProjectLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <Link to="/projects">Projects</Link>
      </li>
      <li>
        <Link to={`/projects/${projectId}/members`}>Project Members</Link>
      </li>
    </>
  );

  const membersPageLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <Link to={`/projects/${projectId}`}>Project</Link>
      </li>
    </>
  );

  let navbarContent;
  if (
    location.pathname === "/" ||
    location.pathname === "/projects/addProject"
  ) {
    navbarContent = homePageLinks;
  } else if (
    location.pathname === "/projects" ||
    location.pathname === "/projects/addProject"
  ) {
    navbarContent = projectsPageLinks;
  } else if (matchPath({ path: "/projects/:projectId" }, location.pathname)) {
    navbarContent = singleProjectLinks;
  } else if (
    matchPath({ path: "/projects/:projectId/members" }, location.pathname) ||
    matchPath({ path: "/projects/addProject" }, location.pathname)
  ) {
    navbarContent = membersPageLinks;
  }
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">TEAMUP</div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {navbarContent}
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          {navbarContent}
          <li>
            <p onClick={handleLogout}>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
