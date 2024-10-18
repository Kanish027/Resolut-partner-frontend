import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postRequest: (state) => {
      state.isLoading = true;
    },
    postSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    postFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    deletePostRequest: (state) => {
      state.isLoading = true;
    },
    deletePostSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  postRequest,
  postSuccess,
  postFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
} = postSlice.actions;

export default postSlice.reducer;
