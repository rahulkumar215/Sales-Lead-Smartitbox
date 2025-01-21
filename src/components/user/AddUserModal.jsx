/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const showToast = (message) => {
  alert(message);
};

const AddUserModal = ({
  isModalOpen,
  setIsModalOpen,
  newUser,
  setNewUser,
  handleAddUser,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!newUser.name.trim()) {
      showToast("Name is required.");
      return false;
    }
    if (!newUser.username.trim()) {
      showToast("Username is required.");
      return false;
    }
    if (!/^\d{10}$/.test(newUser.mobile)) {
      showToast("Please enter a valid 10-digit mobile number.");
      return false;
    }
    if (
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(newUser.email.trim())
    ) {
      showToast("Please enter a valid email address.");
      return false;
    }

    if (newUser.password.length < 8) {
      showToast("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddUser();
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 max-h-screen overflow-y-auto transition-transform transform">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {newUser.uid ? "Edit User" : "Add User"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={newUser.mobile}
                  onChange={(e) =>
                    setNewUser({ ...newUser, mobile: e.target.value })
                  }
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={newUser.designation}
                  onChange={(e) =>
                    setNewUser({ ...newUser, designation: e.target.value })
                  }
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={newUser.department}
                  onChange={(e) =>
                    setNewUser({ ...newUser, department: e.target.value })
                  }
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                    minLength="8"
                    title="Password should be at least 8 characters long"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide Password" : "Show Password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
              <button
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
                onClick={handleSubmit}
              >
                {newUser.uid ? "Update" : "Add"} User
              </button>
              <button
                className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserModal;
