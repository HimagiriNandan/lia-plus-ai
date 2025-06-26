import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const author = useSelector((state) => state.user.name);

  const handleCreatePost = async () => {
    if (!title || !content) {
      toast.error("Title and Content are required");
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/posts/createpost',
        { title, content, author },
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Post created successfully!");
        setTitle('');
        setContent('');
        navigate('/home');
      }
    } catch (err) {
      toast.error("Failed to create post");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f1e4] py-10 px-6 font-oldpaper text-[#2e2e2e] flex justify-center">
      <div className="w-full max-w-xl bg-[#fdfaf4] border border-[#d6c6a8] rounded-sm p-8 pb-0 shadow-sm">
        <h2 className="text-3xl font-bold mb-6 tracking-wide text-[#2e1c0f] text-center">
          Create a New Post
        </h2>

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
          className="mb-8"
          style={{ height: '200px' }}
        />

        <Button
          className="w-full bg-[#8b5e3c] hover:bg-[#5a3b2a] text-white font-semibold"
          onClick={handleCreatePost}
        >
          Create Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
