import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import projectsReducer from "../features/projectsSlice";
import membersSlice from "../features/membersSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectsReducer,
    members: membersSlice,
  },
});
