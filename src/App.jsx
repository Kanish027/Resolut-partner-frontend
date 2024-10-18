import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/postDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex justify-center h-screen">
      <div className="w-1/3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
