import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/getpostdata/${id}`, { withCredentials: true });
      if (response.status === 200) {
        setTitle(response.data.title);
        setContent(response.data.content);
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const handleUpdatePost = async () => {
    if (!title || !content) {
      alert("Title and Content are required");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/updatepost/${id}`,
        { title, content },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setTitle('');
        setContent('');
        window.location.href = '/home';
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f1e4] py-12 px-6 font-oldpaper text-[#2e2e2e] flex justify-center">
      <div className="w-full max-w-3xl bg-[#fdfaf4] border border-[#d6c6a8] rounded-sm p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-8 tracking-wide text-[#2e1c0f] text-center">
          Edit Blog Post
        </h1>

        <label htmlFor="title" className="block mb-2 text-[#5e4b3c] font-semibold">
          Title
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-6"
        />

        <label htmlFor="content" className="block mb-2 text-[#5e4b3c] font-semibold">
          Content
        </label>
        <Textarea
          id="content"
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="mb-8"
        />

        <Button className="w-full bg-[#8b5e3c] hover:bg-[#5a3b2a] text-white font-semibold">
          Update Post
        </Button>
      </div>
    </div>
  );
};

export default EditBlog;
