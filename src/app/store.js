import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice.js";
import allPostsReducer from "../features/post/getPostsSlice.js";
import postDetailReducer from "../features/post/postDetailSlice.js";

const store = configureStore({
  reducer: {
    post: postReducer,
    allPosts: allPostsReducer,
    postDetails: postDetailReducer,
  },
});

export default store;
