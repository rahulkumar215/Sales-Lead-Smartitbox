import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaClipboard,
  FaUsers,
  FaSignOutAlt,
  FaFileInvoice,
} from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
  {
    path: "/leads",
    label: "All Leads",
    icon: <MdLeaderboard />,
    roles: ["admin", "sales executive"],
  },
  {
    path: "/proforma-invoice",
    label: "Proforma Invoice",
    icon: <FaFileInvoice />,
    roles: ["admin", "accounts"],
  },
  { path: "/users", label: "Users", icon: <FaUsers />, roles: ["admin"] },
  { path: "/items", label: "Item Master", icon: <FaBox />, roles: ["admin"] },
  {
    path: "/quote",
    label: "Quotations",
    icon: <FaClipboard />,
    roles: ["admin", "sales executive"],
  },
  { path: "/company", label: "Customers", icon: <FaUsers /> },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  // State to track the active route for highlighting
  const [activeRoute, setActiveRoute] = useState("");
  // State to track if the screen is mobile sized (<=768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update active route when the location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  // Listen to window resize events to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Centralized navigation handler which updates the active route
  // and automatically toggles the sidebar on mobile.
  const handleNavigate = (route) => {
    setActiveRoute(route);
    if (isMobile) {
      toggleSidebar();
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside
      className={`bg-white text-black fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "transform-none" : "-translate-x-full"
      } w-[14rem] h-full md:h-screen overflow-y-auto`}
      style={{ scrollbarWidth: "thin" }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        {isOpen && (
          <img
            src="src/assets/img/logo-tp.png"
            alt="Logo"
            className="h-16 object-contain"
          />
        )}
        <button className="md:hidden text-black" onClick={toggleSidebar}>
          Close
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="p-4">
        <ul className="space-y-4">
          {menuItems.map(
            ({ path, label, icon, roles }) =>
              (!roles || roles.includes(role)) && (
                <li key={path}>
                  <button
                    onClick={() => handleNavigate(path)}
                    className={`flex items-center space-x-4 w-full p-2 rounded-md transition-colors hover:bg-yellow-300 ${
                      activeRoute === path ? "bg-yellow-300" : ""
                    }`}
                  >
                    <span className="text-xl">{icon}</span>
                    {isOpen && <span>{label}</span>}
                  </button>
                </li>
              )
          )}

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 w-full p-2 rounded-md transition-colors bg-red-600 hover:bg-red-700 text-white"
            >
              <FaSignOutAlt className="text-xl" />
              {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
