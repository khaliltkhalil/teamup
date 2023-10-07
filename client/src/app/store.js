import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import projectsReducer from "../features/projectsSlice";
import membersSlice from "../features/membersSlice";
import tasksSlice from "../features/tasksSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    members: membersSlice,
    tasks: tasksSlice,
  },
});
