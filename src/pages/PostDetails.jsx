import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, postDetails } from "../actions/createPost";
import { Heart, MessageCircle, Send, Bookmark, Trash2 } from "lucide-react";

const PostDetails = () => {
  const { id } = useParams();
  const { details, isLoading } = useSelector((state) => state.postDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(postDetails(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    await dispatch(deletePost(id));
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="max-w-xl mx-auto p-4 text-center text-red-500">
        Unable to load post details. Please try again later.
      </div>
    );
  }

  const { image, description, createdAt } = details;

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="mb-8 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <div className="p-4 border-b border-gray-300 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <h4 className="font-semibold text-sm">User</h4>
          </div>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition duration-300"
          >
            <Trash2 size={20} />
          </button>
        </div>
        {image && image.image_url && (
          <div className="relative pt-[100%]">
            <img
              src={image.image_url}
              alt="Post"
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <Heart className="cursor-pointer text-gray-700 hover:text-red-500 transition duration-300" />
              <MessageCircle className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300" />
              <Send className="cursor-pointer text-gray-700 hover:text-green-500 transition duration-300" />
            </div>
            <Bookmark className="cursor-pointer text-gray-700 hover:text-yellow-500 transition duration-300" />
          </div>
          <p className="font-semibold mb-2 text-sm">0 likes</p>
          <p className="text-sm">
            <span className="font-semibold mr-2">User</span>
            {description}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
