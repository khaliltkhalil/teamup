import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { checkUserSession } from "./features/userSlice";
import AddProject from "./pages/AddProject";
import SingleProject from "./pages/SingleProject";
import Members from "./pages/Members";

const container = document.getElementById("root");
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/addProject",
        element: <AddProject />,
      },
      {
        path: "/projects/:projectId",
        element: <SingleProject />,
        id: "singleProject",
      },
      {
        path: "/projects/:projectId/members",
        element: <Members />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

store.dispatch(checkUserSession());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
