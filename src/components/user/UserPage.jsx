import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddUserModal from "./AddUserModal";

const UserPage = () => {
  const [users, setUsers] = useState([
    {
      uid: "user-1",
      name: "Alice Johnson",
      mobile: "9876543210",
      email: "alice.johnson@example.com",
      designation: "Software Engineer",
      department: "IT",
      username: "alice.johnson",
      password: "Pass@1234",
    },
    {
      uid: "user-2",
      name: "Bob Smith",
      mobile: "9123456789",
      email: "bob.smith@example.com",
      designation: "Product Manager",
      department: "Product",
      username: "bob.smith",
      password: "Pass@5678",
    },
    {
      uid: "user-3",
      name: "Charlie Davis",
      mobile: "9988776655",
      email: "charlie.davis@example.com",
      designation: "HR Specialist",
      department: "Human Resources",
      username: "charlie.davis",
      password: "Pass@9012",
    },
    {
      uid: "user-4",
      name: "Diana Miller",
      mobile: "8888888888",
      email: "diana.miller@example.com",
      designation: "Marketing Lead",
      department: "Marketing",
      username: "diana.miller",
      password: "Pass@3456",
    },
    {
      uid: "user-5",
      name: "Ethan Brown",
      mobile: "7777777777",
      email: "ethan.brown@example.com",
      designation: "Data Analyst",
      department: "Analytics",
      username: "ethan.brown",
      password: "Pass@7890",
    },
  ]);
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

  const handleAddUser = () => {
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

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
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
        <p className="text-sm text-gray-800 font-semibold">
          {filteredUsers.length} entries found
        </p>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          previousLabel={
            <span className=" bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Prev
            </span>
          }
          nextLabel={
            <span className=" bg-gray-200 text-gray-600 px-2 py-1 rounded-sm hover:bg-gray-300 transition-all">
              Next
            </span>
          }
          activeClassName="bg-indigo-600 text-white font-semibold px-2 rounded-sm transition-all"
          disabledClassName="text-gray-400 cursor-not-allowed"
          pageClassName="px-2 rounded-sm text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 cursor-pointer transition-all"
          breakClassName="text-gray-600"
        />
      </div>
    </div>
  );
};

export default UserPage;
