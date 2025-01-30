import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import AddUserModal from "./AddUserModal";
import axios from "axios";

const dummyUsers = [
  {
    uid: "user-1",
    name: "Alice Johnson",
    mobile: "9876543210",
    email: "alice.johnson@example.com",
    role: "admin",
    username: "alice.johnson",
    password: "Pass@1234",
  },
  {
    uid: "user-2",
    name: "Bob Smith",
    mobile: "9123456789",
    email: "bob.smith@example.com",
    role: "executive",
    username: "bob.smith",
    password: "Pass@5678",
  },
  {
    uid: "user-3",
    name: "Charlie Davis",
    mobile: "9988776655",
    email: "charlie.davis@example.com",
    role: "executive",
    username: "charlie.davis",
    password: "Pass@9012",
  },
  {
    uid: "user-4",
    name: "Diana Miller",
    mobile: "8888888888",
    email: "diana.miller@example.com",
    role: "executive",
    username: "diana.miller",
    password: "Pass@3456",
  },
  {
    uid: "user-5",
    name: "Ethan Brown",
    mobile: "7777777777",
    email: "ethan.brown@example.com",
    role: "executive",
    username: "ethan.brown",
    password: "Pass@7890",
  },
];

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [newUser, setNewUser] = useState({
    name: "",
    mobileNo: "",
    email: "",
    role: "executive",
    username: "",
    pswd: "",
  });

  const token = localStorage.getItem("token");
  console.log("token", token);
  const registerUser = async () => {
    const url =
      "https://leads-management-backend.onrender.com/api/users/register";

    try {
      const response = await axios.post(url, newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleAddUser = () => {
    const existingUserIndex = users?.findIndex(
      (user) => user._id === newUser._id
    );

    if (existingUserIndex !== -1) {
      // Update existing user details
      const updatedUsers = [...users];
      updatedUsers[existingUserIndex] = { ...newUser };
      setUsers(updatedUsers);
      toast.success("User updated successfully!");
    } else {
      // Add a new user
      const newUserWithUID = registerUser();
      console.log(newUserWithUID);
      setUsers([...users, newUserWithUID]);
      toast.success("User added successfully!");
    }

    // Close the modal and reset the form
    setIsModalOpen(false);
    setNewUser({
      name: "",
      mobileNo: "",
      email: "",
      role: "",
      username: "",
      pswd: "",
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

  const filteredUsers = users?.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const usersPerPage = 10;
  const pageCount = Math.ceil(filteredUsers?.length / usersPerPage);
  const displayUsers = filteredUsers?.slice(
    pageNumber * usersPerPage,
    (pageNumber + 1) * usersPerPage
  );

  const handlePageChange = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(`In user page`);

  useEffect(() => {
    const fetchUsers = async () => {
      // const token = localStorage.getItem("token");

      console.log(token);

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      const url =
        "https://leads-management-backend.onrender.com/api/users/users";

      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in the Authorization header
          },
        });

        setUsers(response.data); // Assuming response contains the list of users
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching users:",
          err.response ? err.response.data : err.message
        );
        setError("Error fetching users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-white p-3">
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
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search by anything..."
          onChange={handleSearch}
          className="p-1 border border-gray-300 bg-gray-100 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-600 placeholder:text-black"
        />
        <button
          className="px-6 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus />
          Add User
        </button>
      </div>

      {/* User Table */}
      <div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="min-w-full table-auto overflow-x-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr className="bg-blue-900 text-white">
              {["Name", "Mobile", "Email", "Role", "Username", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left font-medium text-sm"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {displayUsers?.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              displayUsers?.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 border border-t-gray-300  "
                >
                  {["name", "mobileNo", "email", "role", "username"].map(
                    (field) => (
                      <td key={field} className="px-3 py-2 text-sm">
                        {user[field]}
                      </td>
                    )
                  )}
                  <td className="px-3 py-2 flex gap-2 items-center justify-center">
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
          {filteredUsers?.length} entries found
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
