import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const postDetailSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postDetailRequest: (state) => {
      state.isLoading = true;
    },
    postDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.details = action.payload;
    },
    postDetailFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { postDetailRequest, postDetailSuccess, postDetailFailure } =
  postDetailSlice.actions;

export default postDetailSlice.reducer;
