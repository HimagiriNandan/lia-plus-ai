import Navbar from "./Navbar";
const Layout = ({ children }) => {
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
