/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const showToast = (message) => {
  alert(message);
};

const AddUserModal = ({
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
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleAddUser();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div
        className="bg-white p-6 sm:w-1/2 w-11/12 rounded-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <h2 className="text-xl font-semibold text-indigo-600 mb-3">
          {newUser._id ? "Edit User" : "Add User"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-1 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="w-full p-1 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role <span className="text-red-600">*</span>
            </label>
            <select
              type="text"
              name="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="w-full p-1 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            >
              <option>admin</option>
              <option>executive</option>
            </select>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={newUser.mobileNo}
              onChange={(e) =>
                setNewUser({ ...newUser, mobileNo: e.target.value })
              }
              className="w-full p-1 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full p-1 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={newUser.pswd}
                onChange={(e) =>
                  setNewUser({ ...newUser, pswd: e.target.value })
                }
                className="w-full p-1 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row sm:justify-between mt-3 gap-4 col-span-full">
            <button
              type="submit"
              className="px-3 py-1 w-full sm:w-fit bg-indigo-600 text-white rounded-[5px] hover:bg-indigo-700 transition duration-200"
            >
              {newUser.uid ? "Update" : "Add"} User
            </button>
            <button
              type="button"
              className="px-3 py-1 w-full sm:w-fit bg-gray-400 text-white rounded-[5px] hover:bg-gray-500 transition duration-200"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
