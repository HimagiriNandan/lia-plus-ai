// components/admin/AdminDashboard.jsx
import React, { useState, useNavigate } from "react";
import { AdminNavbar } from "./Navbar";
import { CreatePostForm } from "./CreatePostForm";
import { ShowBlogs } from "./ShowBlogs";

export function AdminDashboard() {
  const [view, setView] = useState("create");
  const navigate = useNavigate('/login')

  const handleLogout = async () => {
    try{
        const res = await axios.post("/api/logout", {}, { withCredentials: true });
        navigate('/login');
    }catch(err){
        console.log(err);
    }

  };

  return (
    <div>
      <AdminNavbar onNavigate={setView} onLogout={handleLogout} />
      {view === "create" && <CreatePostForm onPostCreated={() => setView("blogs")} />}
      {view === "blogs" && <ShowBlogs />}
    </div>
  );
}
