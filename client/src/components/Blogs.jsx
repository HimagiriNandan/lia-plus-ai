import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "@/store/slices/postSlice";

function Blogs() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPost() {
      try {
        const res = await axios.get("http://localhost:5000/api/posts/getpost", {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(getPosts(res.data));
        }
      } catch (err) {
        console.error(err.message);
        setError("Failed to load posts. Please try again later.");
      }
    }
    getPost();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f5f1e8] py-10 px-6 text-[#2e2e2e] font-serif">
      <h1 className="text-center text-4xl md:text-5xl font-bold tracking-wider mb-4 font-oldpaper text-[#2d1e0e]">
        The Blogging Times
      </h1>

      <p className="text-center text-lg md:text-xl italic mb-12 text-[#4a3b2c] font-oldpaper">
        Every post is a voice. Every voice has a story. Welcome to ours
      </p>

      {error && (
        <p className="text-center text-red-600 font-medium mb-6">{error}</p>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.length !== 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#fdfaf4] border border-[#d6c6a8] rounded-md shadow-md p-6 relative overflow-hidden hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="absolute  rounded-full opacity-30 "></div>
              <div className="absolute   bg-[#c5ab83] rounded-full "></div>

              <h2 className="text-xl md:text-2xl font-bold mb-3 tracking-wide font-oldpaper text-[#2e1c0f] group-hover:underline underline-offset-4 decoration-[#8b5e3c]">
                {post.title}
              </h2>

              <p className="text-sm text-[#3f3f3f] leading-relaxed mb-4 font-light">
                {post?.content && post.content.length > 300
                  ? post.content.substring(0, 300) : post.content}
              </p>

              <div className="text-xs text-[#5e4b3c] flex justify-between border-t pt-3 mt-2 font-medium">
                <span>
                  <span className="font-semibold">Author:</span>{" "}
                  {post.author}
                </span>
                <span>

                  {new Date(post.timeStamp).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="mt-4 text-right">
                <a
                  href={`/blog/${post._id}`}
                  className="inline-block text-sm text-[#8b5e3c] font-semibold underline underline-offset-2 hover:text-[#5a3b2a] transition-colors"
                >
                  Read Full Story →
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-[#666] text-lg">
            No posts found. Start writing your first adventure!
          </p>
        )}
      </div>
    </div>
  );
}

export default Blogs;
