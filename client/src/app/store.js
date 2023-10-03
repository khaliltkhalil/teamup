import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import projectsReducer from "../features/projectsSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
  },
});
