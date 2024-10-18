import axios from "axios";
import { toast } from "react-hot-toast";
import {
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
  postFailure,
  postRequest,
  postSuccess,
} from "../features/post/postSlice";
import {
  getPostFailure,
  getPostRequest,
  getPostSuccess,
} from "../features/post/getPostsSlice";
import {
  postDetailFailure,
  postDetailRequest,
  postDetailSuccess,
} from "../features/post/postDetailSlice";

const createPost = (formData) => async (dispatch) => {
  try {
    dispatch(postRequest());

    const { data } = await axios.post("/api/api/v1/create", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(data);
    toast.success(data.message);
    dispatch(postSuccess());
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(postFailure(error.response.data.message));
  }
};

const getAllPosts = () => async (dispatch) => {
  try {
    dispatch(getPostRequest());
    const { data } = await axios.get("/api/api/v1/posts");
    dispatch(getPostSuccess(data));
  } catch (error) {
    dispatch(getPostFailure(error.response.data.message));
  }
};

const postDetails = (id) => async (dispatch) => {
  try {
    dispatch(postDetailRequest());

    const { data } = await axios.get(`/api/api/v1/post/${id}`);

    dispatch(postDetailSuccess(data.post));
  } catch (error) {
    dispatch(postDetailFailure(error.response.data.message));
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(deletePostRequest());

    const { data } = await axios.delete(`/api/api/v1/delete/${id}`);

    toast.success(data.message);

    dispatch(deletePostSuccess(data));
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(deletePostFailure(error.response.data.message));
  }
};

export { createPost, getAllPosts, postDetails, deletePost };
