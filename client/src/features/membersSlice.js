import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  currentProjectId: "",
  data: [],
  status: "idle",
  error: null,
};

export const fetchMembers = createAsyncThunk(
  "projects/fetchMembers",
  async (projectId, { getState, dispatch }) => {
    // get all users that are in this projectId
    const response = await axios.get(`/api/v1/users?project_id=${projectId}`);
    dispatch(setCurrentProjectId(projectId));
    return response.data;
  }
);

// export const addMember = createAsyncThunk(
//   "projects/addMember",
//   async (userId) => {
//     const response = await axios.post("/api/v1/projects", projectData);
//     return response.data;
//   }
// );

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setCurrentProjectId(state, action) {
      state.currentProjectId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    //   .addCase(addProject.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(addProject.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.data.push(action.payload);
    //   })
    //   .addCase(addProject.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //   });
  },
});

export const selectMembersStatus = (state) => state.members.status;
export const selectMembers = (state) => state.members.data;
// export const selectProjectById = (state, projectId) =>
//   state.projects.data.find((project) => project.id == projectId);
export const selectCurrentProjectId = (state) => state.members.currentProjectId;
export const { setCurrentProjectId } = membersSlice.actions;
export default membersSlice.reducer;
