import {
  FaHome,
  FaBox,
  FaCog,
  FaClipboard,
  FaUsers,
  FaFileAlt,
  FaHeadset,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <aside
      className={`bg-blue-800 text-white fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "transform-none" : "-translate-x-full"
      } w-[14rem] h-full md:h-screen overflow-y-auto`}
    >
      <div className="flex items-center justify-between p-4">
        <div
          className={`text-2xl font-bold text-white ${
            isOpen ? "block" : "hidden"
          }`}
        >
          SMART ITBOX
        </div>
        <button className="md:hidden text-white" onClick={toggleSidebar}>
          Close
        </button>
      </div>

      <ul className="space-y-4 p-4">
        {/* Dashboard */}
        <li
          className="flex items-center space-x-4 hover:cursor-pointer hover:bg-gray-700 p-2 rounded-md"
          onClick={() => navigate("/home")}
        >
          <FaHome className={`text-xl ${isOpen ? "block" : "hidden"}`} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Dashboard</span>
        </li>

        <li
          className="flex items-center space-x-4 hover:cursor-pointer hover:bg-gray-700 p-2 rounded-md"
          onClick={() => navigate("/leads")}
        >
          <MdLeaderboard className={`text-xl ${isOpen ? "block" : "hidden"}`} />
          <span className={`${isOpen ? "block" : "hidden"}`}>All Leads</span>
        </li>

        {/* User Access */}
        <li
          className="flex items-center space-x-4 hover:cursor-pointer hover:bg-gray-700 p-2 rounded-md"
          onClick={() => navigate("/users")}
        >
          <FaUsers className={`text-xl ${isOpen ? "block" : "hidden"}`} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Users</span>
        </li>

        {/* Item Master */}
        <li
          className="flex items-center space-x-4 hover:cursor-pointer hover:bg-gray-700 p-2 rounded-md"
          onClick={() => navigate("/items")}
        >
          <FaBox className={`text-xl ${isOpen ? "block" : "hidden"}`} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Item Master</span>
        </li>

        {/* Quotations */}
        <li
          className="flex items-center space-x-4 hover:cursor-pointer hover:bg-gray-700 p-2 rounded-md"
          onClick={() => navigate("/home")}
        >
          <FaClipboard className={`text-xl ${isOpen ? "block" : "hidden"}`} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Quotations</span>
        </li>

        {/* Customers */}
        <li
          className="flex items-center space-x-4 hover:cursor-pointer hover:bg-gray-700 p-2 rounded-md"
          onClick={() => navigate("/company")}
        >
          <FaUsers className={`text-xl ${isOpen ? "block" : "hidden"}`} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Customers</span>
        </li>

        {/* Reports */}
        <li
          className="flex items-center space-x-4 hover:cursor-pointer hover:bg-gray-700 p-2 rounded-md"
          onClick={() => navigate("/home")}
        >
          <FaFileAlt className={`text-xl ${isOpen ? "block" : "hidden"}`} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Reports</span>
        </li>

        {/* Logout */}
        <li
          className="flex items-center space-x-4 hover:cursor-pointer hover:bg-gray-700 p-2 rounded-md cursor-pointer"
          onClick={handleLogout}
        >
          <FaSignOutAlt className={`text-xl ${isOpen ? "block" : "hidden"}`} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
