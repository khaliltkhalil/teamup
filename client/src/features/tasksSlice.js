import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  currentProjectId: "",
  data: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "projects/fetchTasks",
  async (projectId) => {
    // get all users that are in this projectId
    const response = await axios.get(`/api/v1/tasks?project_id=${projectId}`);
    const tasks = await response.data;
    return {
      data: tasks,
      currentProjectId: projectId,
    };
  }
);

export const addTask = createAsyncThunk(
  "projects/addTask",
  async (taskData) => {
    const response = await axios.post("/api/v1/tasks", taskData);
    return response.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCurrentProjectId(state, action) {
      state.currentProjectId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.currentProjectId = action.payload.currentProjectId;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //   .addCase(addMember.pending, (state) => {
      //     state.status = "loading";
      //   })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      });
    //   .addCase(addMember.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //   });
  },
});

export const selectTasksStatus = (state) => state.tasks.status;
export const selectTasks = (state) => state.tasks.data;
// export const selectProjectById = (state, projectId) =>
//   state.projects.data.find((project) => project.id == projectId);
export const selectCurrentProjectId = (state) => state.tasks.currentProjectId;
export default tasksSlice.reducer;