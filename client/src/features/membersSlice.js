import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    const members = await response.data;
    return {
      data: members,
      currentProjectId: projectId,
    };
  }
);

export const addMember = createAsyncThunk(
  "projects/addMember",
  async (userProjectData) => {
    const response = await axios.post(
      "/api/v1/projects_users_roles",
      userProjectData
    );
    return response.data;
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setCurrentProjectId(state, action) {
      state.currentProjectId = action.payload;
    },
    clearMembersState(state, action) {
      state.status = "idle";
      state.date = [];
      state.error = null;
      state.currentProjectId = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.currentProjectId = action.payload.currentProjectId;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //   .addCase(addMember.pending, (state) => {
      //     state.status = "loading";
      //   })
      .addCase(addMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      });
    //   .addCase(addMember.rejected, (state, action) => {
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
export const { clearMembersState } = membersSlice.actions;
export default membersSlice.reducer;
