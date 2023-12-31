import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get("/api/v1/projects");
    return response.data;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProjects",
  async (projectData) => {
    const response = await axios.post("/api/v1/projects", projectData);
    return response.data;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProjectState(state, action) {
      state.status = "idle";
      state.date = [];
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push({
          ...action.payload,
          role: "manager",
        });
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectProjectsStatus = (state) => state.projects.status;
export const selectProjects = (state) => state.projects.data;
export const selectProjectById = (state, projectId) =>
  state.projects.data.find((project) => project.id === Number(projectId));
export const { clearProjectState } = projectsSlice.actions;
export default projectsSlice.reducer;
