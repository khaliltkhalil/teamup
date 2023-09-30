import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const createUser = createAsyncThunk("user/fetchUser", async (user) => {
  const response = await axios.post("/api/v1/signup", user);
  return response.data;
});

export const loginUser = createAsyncThunk("user/fetchUser", async (user) => {
  const response = await axios.post("/api/v1/signin", user, {
    withCredentials: true,
  });
  return response.data;
});

export const checkUserSession = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("/api/v1/check_session");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export default userSlice.reducer;
