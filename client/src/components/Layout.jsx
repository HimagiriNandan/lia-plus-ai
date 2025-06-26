import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Layout = ({ children }) => {
    const navigate = useNavigate();
    const userdata = useSelector((state => state.user.id));
    useEffect(()=>{
        // if(!userdata && window.location.pathname !== "/login") {
        //     console.log("User not authenticated, redirecting to login page.");
        //     navigate("/login");
        // }
    },[])
    return (
        <div className="layout">
            {
                window.location.pathname!=="/login" &&
                <Navbar />
            }
            
            <main className="main-content">
                {children}
            </main>
        </div>
    )
}

export default Layout;
