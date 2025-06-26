import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "@/store/slices/postSlice";

function Blogs() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    async function getPost() {
      try {
        const res = await axios.get('http://localhost:5000/api/posts/getuserpost', { withCredentials: true });
        if (res.status === 200) {
          dispatch(getPosts(res.data));
          console.log(res.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getPost();
  }, [dispatch]);

  const handleDeletePost = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/posts/deletepost/${id}`, { withCredentials: true });
      if (res.status === 200) {
        dispatch(getPosts(posts.filter(post => post._id !== id)));
        console.log("Post deleted successfully");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="h-full w-full bg-[#f8f1e4]">
      <div className="min-h-screen bg-[#f8f1e4] py-10 px-6 font-oldpaper text-[#2e2e2e] max-w-5xl mx-auto">
        {posts.length === 0 && (
          <h1 className="text-center text-2xl text-[#7a6a58] font-semibold mt-20">No Posts Available</h1>
        )}

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-[#fdfaf4] border border-[#d6c6a8] rounded-sm p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-3 tracking-wide text-[#2e1c0f]">
              {post.title.toUpperCase()}
            </h2>

            <p className="text-[16px] leading-relaxed tracking-wide text-[#3b2a1a] mb-6 whitespace-pre-line">
              {post.content && post.content.length > 200
                ? post.content.substring(0, 200) + " ..."
                : post.content}
            </p>

            <div className="flex flex-wrap justify-between text-sm text-[#5e4b3c] italic mb-4">
              <p>
                <b>Author:</b> {post.author}
              </p>
              <p>
                <b>Date:</b> {new Date(post.timeStamp).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-end">
              <a
                href={`/blog/${post._id}`}
                className="text-[#8b5e3c] underline font-semibold hover:text-[#5a3b2a]"
              >
                Read More
              </a>
              <a
                href={`/edit-blog/${post._id}`}
                className="bg-gray-400 text-white px-3 py-1 rounded text-sm hover:bg-gray-500"
              >
                Edit
              </a>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Blogs;
