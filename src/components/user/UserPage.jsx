import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddUserModal from "./AddUserModal";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [newUser, setNewUser] = useState({
    name: "",
    mobile: "",
    email: "",
    designation: "",
    department: "",
    username: "",
    password: "",
  });

  const generateUID = () => `user-${Math.floor(Math.random() * 1000000)}`;

  const handleAddUser = (e) => {
    e.preventDefault();

    // Check if required fields are empty
    const { username, name, mobile, email, password } = newUser;

    if (!username || !name || !mobile || !email || !password) {
      alert("All required fields must be filled!");
      return;
    }

    // Close the modal after successful submission
    setIsModalOpen(false);
    const newUserWithUID = { ...newUser, uid: generateUID() };
    setUsers([...users, newUserWithUID]);
    toast.success("User added successfully!");
    setIsModalOpen(false);
    setNewUser({
      name: "",
      mobile: "",
      email: "",
      designation: "",
      department: "",
      username: "",
      password: "",
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDeleteUser = (uid) => {
    setUsers(users.filter((user) => user.uid !== uid));
    toast.error("User deleted successfully!");
  };

  const handleEditUser = (uid) => {
    const userToEdit = users.find((user) => user.uid === uid);
    setNewUser(userToEdit);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
  );

  const usersPerPage = 5;
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const displayUsers = filteredUsers.slice(
    pageNumber * usersPerPage,
    (pageNumber + 1) * usersPerPage
  );

  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-300 p-6">
      <ToastContainer />

      {/* Add User Modal */}
      {isModalOpen && (
        <AddUserModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          newUser={newUser}
          setNewUser={setNewUser}
          handleAddUser={handleAddUser}
        />
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search users"
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              {[
                "UID",
                "Name",
                "Mobile",
                "Email",
                "Designation",
                "Department",
                "Username",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left font-medium text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              displayUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-50">
                  {[
                    "uid",
                    "name",
                    "mobile",
                    "email",
                    "designation",
                    "department",
                    "username",
                  ].map((field) => (
                    <td key={field} className="px-6 py-4 text-sm">
                      {user[field]}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => handleEditUser(user.uid)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.uid)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          {filteredUsers.length} entries found
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex space-x-2"
          previousLabel="Prev"
          nextLabel="Next"
          activeClassName="bg-indigo-600 text-white px-4 py-2 rounded-md"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default UserPage;
