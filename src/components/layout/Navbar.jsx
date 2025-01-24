import { useState } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
// import { API_BASE_URL } from "../../config";

// Helper function to fetch user details
// const fetchUserDetails = async (token) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/users/details`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`, // Attach the token
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch user details");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching user details:", error.message);
//     throw error;
//   }
// };

// eslint-disable-next-line react/prop-types
const Navbar = ({ toggleSidebar }) => {
  // State to manage visibility of the profile modal
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // State to store user details
  const [userData, setUserData] = useState(null);

  // Fetch token from localStorage
  //   const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  // Fetch user details when the component mounts
  //   useEffect(() => {
  //     if (token) {
  //       fetchUserDetails(token)
  //         .then((data) => {
  //           console.log("User Data Fetched:", data); // Log the fetched data
  //           setUserData(data); // Update user data state
  //         })
  //         .catch((error) => {
  //           console.error("Error in fetching user details:", error);
  //         });
  //     }
  //   }, [token]); // Only run on mount when token is available

  // Toggle function for opening/closing the profile modal
  const toggleProfileModal = () => {
    setIsProfileOpen((prevState) => !prevState);
  };

  return (
    <div>
      <nav className="flex items-center justify-between p-2 bg-red-700 text-white shadow-lg">
        {/* Left Section: Hamburger Menu for Sidebar */}
        <button
          className="p-2 rounded-md text-white hover:bg-yellow-500 transition-colors duration-300"
          onClick={toggleSidebar}
        >
          <FaBars className="text-2xl" />
        </button>

        {/* Center Section: App Title or Logo */}
        <div className="text-2xl font-bold tracking-wide text-center flex flex-col sm:flex-row">
          <span className=" text-white-600 text-[1.2rem] sm:text-2xl">
            LEADS&nbsp;
          </span>
          <span className=" text-white-600 text-[1.2rem] sm:text-2xl">
            MANAGEMENT SYSTEM
          </span>
        </div>

        {/* Right Section: Profile Section with Hover Effects */}
        <div
          onClick={toggleProfileModal}
          className="relative flex items-center space-x-4 cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-3xl hover:text-indigo-200 transition-all duration-300" />
            <span className="hidden sm:block text-lg hover:text-indigo-200 transition-all duration-300">
              Profile
            </span>
          </div>

          {/* Profile Modal */}
          {/* {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
              <h2 className="text-xl font-semibold mb-4">User Profile</h2>
              {userData ? (
                <>
                  <div className="mb-4">
                    <strong className="text-black">Name:</strong>
                    <p className="text-black">{userData.name}</p>
                  </div>
                  <div className="mb-4">
                    <strong className="text-black">Email:</strong>
                    <p className="text-black">{userData.email}</p>
                  </div>
                  <div className="mb-4">
                    <strong className="text-black">Phone:</strong>
                    <p className="text-black">{userData.mobileNo}</p>
                  </div>
                  <div className="mb-4">
                    <strong className="text-black">Role:</strong>
                    <p className="text-black">{userData.role}</p>
                  </div>
                </>
              ) : (
                <p className="text-black">Loading...</p>
              )}
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                  onClick={toggleProfileModal}
                >
                  Close
                </button>
              </div>
            </div>
          )} */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
