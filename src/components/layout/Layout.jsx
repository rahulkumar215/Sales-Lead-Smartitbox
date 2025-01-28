import { useState } from "react";
import Sidebar from "./Sidebar"; // Adjust path as needed
import Navbar from "./Navbar"; // Adjust path as needed
import { Outlet } from "react-router-dom"; // Used to render the current page content
import Footer from "../footer/Footer";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userInfo = {
    uid: "UID-Infini8",
    name: "Rahul",
    mobile: "9319444628",
    email: "rk83029014@gmail.com",
    designation: "sales",
    department: "executive",
    username: "Infini8",
    password: "415263",
  };

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-[14rem]" : "ml-0"
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Render the page-specific content here */}
        <div
          className="content transition-all duration-300 ease-in-out"
          style={
            isSidebarOpen
              ? { maxWidth: "calc(100vw - 15rem)" }
              : { maxWidth: "calc(100vw - 1rem)" }
          }
        >
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
