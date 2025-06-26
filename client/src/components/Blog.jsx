import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/getpostdata/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    fetchPost();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f8f1e4] py-10 px-4 md:px-6 text-[#2e2e2e] font-oldpaper">
      <div className="max-w-3xl mx-auto bg-[#fdfaf4] border border-[#d6c6a8] p-6 md:p-10 rounded-sm">
      
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide text-[#2e1c0f] text-center">
          {post?.title?.toUpperCase()}
        </h1>

        <div className="text-sm text-[#5e4b3c] italic text-center mb-8">
           <b>{post?.author}</b> &nbsp; | &nbsp;
          
          {post?.timeStamp &&
            new Date(post.timeStamp).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
        </div>

        <p className="text-[16px] leading-relaxed tracking-wide whitespace-pre-line text-[#3b2a1a]">
          {post?.content}
        </p>

       
      </div>
    </div>
  );
};

export default Blog;
