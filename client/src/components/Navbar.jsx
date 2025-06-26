import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import '../styles/Nabar.css';

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user);

  const submitLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <nav className="bg-[#f8f1e4] border-b border-[#d6c6a8] shadow-sm font-oldpaper text-[#4a3b2c] px-6 py-4 flex justify-between items-center">
        <div className="logo text-2xl font-bold tracking-widest select-none text-[#5e4b3c]">
          BLOGGING SITE
        </div>
        <div className="mobile">
          <button onClick={()=>{setShowMenu(!showMenu)}} href="#">☰</button>
        </div>

        <div className={(showMenu ? "mobile-links-down" : "mobile-links-up")+ " nav-links flex gap-6 text-sm md:text-base"}>
          <a
            href="/home"
            className="hover:underline underline-offset-2 decoration-[#8b5e3c] transition-colors"
          >
            Home
          </a>

          {user.role === "admin" && (
            <a
              href="/myblogs"
              className="hover:underline underline-offset-2 decoration-[#8b5e3c] transition-colors"
            >
              My Blogs
            </a>
          )}

          <a
            href="/about"
            className="hover:underline underline-offset-2 decoration-[#8b5e3c] transition-colors"
          >
            About Us
          </a>

          {user.role === "admin" && (
            <a
              href="/create"
              className="hover:underline underline-offset-2 decoration-[#8b5e3c] transition-colors"
            >
              Create Post
            </a>
          )}

          <button
            onClick={submitLogout}
            className="text-[#8b5e3c] hover:text-[#5a3b2a] font-semibold underline underline-offset-2 cursor-pointer bg-transparent border-none p-0"
          >
            Logout
          </button>
        </div>
      </nav>
      <hr className="border-t border-[#d6c6a8]" />
    </>
  );
}

export default Navbar;
