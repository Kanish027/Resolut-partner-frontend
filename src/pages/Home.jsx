import React, { useEffect, useState } from "react";
import {
  Camera,
  Image,
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts } from "../actions/createPost";
import { Link } from "react-router-dom";

const Home = () => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { posts, isLoading } = useSelector((state) => state.allPosts);
  const dispatch = useDispatch();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", caption);
    formData.append("image", selectedImage);
    await dispatch(createPost(formData));
    setCaption("");
    setSelectedImage(null);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 min-h-screen">
      <h3 className="text-center font-bold text-2xl mb-8 text-gray-800">
        Create Post
      </h3>
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-8 shadow-md">
        <form onSubmit={handleCreatePost}>
          <div className="p-4">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-75 hover:opacity-100 transition duration-300"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Camera size={48} className="text-gray-500 mb-2" />
                  <span className="text-sm font-medium text-gray-500">
                    Upload a photo
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-300">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full h-24 resize-none border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="p-4 border-t border-gray-300">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Share Post
            </button>
          </div>
        </form>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : posts && posts.posts && posts.posts.length > 0 ? (
          posts.posts.map((post) => (
            <Link key={post._id} to={`/post/${post._id}`}>
              <div className="mb-8 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <div className="p-4 border-b border-gray-300 flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <h4 className="font-semibold text-sm">User</h4>
                </div>
                {post.image && post.image.image_url && (
                  <div className="relative pt-[100%]">
                    <img
                      src={post.image.image_url}
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
                    {post.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
