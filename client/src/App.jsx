import Layout from './components/Layout';
import './App.css'
import Blogs from './components/Blogs'
import CreatePost from './components/CreateBlogs'
import Login from './components/Login'
import MyBlogs from './components/MyBlogs'
import useAuthInit from './hooks/useAuthInit';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Blog from './components/Blog';
import EditBlog from './components/EditBlog';
import AboutUs from './components/AboutUs';

function App() {
    useAuthInit();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Login/></Layout>}></Route>
          <Route path="/login" element={<Layout><Login /></Layout>}></Route>
          <Route path="/home" element={<Layout><Blogs /></Layout>}></Route>
          <Route path="/create" element={<Layout><CreatePost /></Layout>}></Route>
          <Route path="/blog/:id" element={<Layout><Blog/></Layout>}></Route>
          <Route path="/myblogs" element={<Layout><MyBlogs /></Layout>}></Route>
          <Route path="/edit-blog/:id" element={<Layout><EditBlog /></Layout>}></Route>
          <Route path="/about" element={<Layout><AboutUs /></Layout>} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
