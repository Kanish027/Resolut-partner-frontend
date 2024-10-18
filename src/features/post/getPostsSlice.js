import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const getPostSlice = createSlice({
  name: "allPosts",
  initialState,
  reducers: {
    getPostRequest: (state) => {
      state.isLoading = true;
    },
    getPostSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getPostRequest, getPostSuccess, getPostFailure } =
  getPostSlice.actions;

export default getPostSlice.reducer;
